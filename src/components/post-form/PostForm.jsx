import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loder";
import "./postform.css";
export default function PostForm({ post }) {
  const [loding, setLoading] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.data);

  const submit = async (data) => {
    setLoading(true);
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      setLoading(false);
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        let currentuserId;
        if (userData.data) {
          currentuserId = userData.data.$id;
        } else {
          currentuserId = userData.$id;
        }
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: currentuserId,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {

    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      {loding ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submit)} className="formbox">
          <div className="leftside">
            <Input
              label="Title :"
              placeholder="Title"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug :"
              placeholder="Slug"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
          <div className="rightside">
            <Input
              label="Featured Image :"
              type="file"
              className="input-feild"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="image-box">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                />
              </div>
            )}
            <Select
              options={["active", "inactive"]}
              label="Status"
              {...register("status", { required: true })}
            />
            <Button type="submit">{post ? "Update" : "Submit"}</Button>
          </div>
        </form>
      )}
    </>
  );
}
