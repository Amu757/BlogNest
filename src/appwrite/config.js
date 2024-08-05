/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteprojectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDBId,
        conf.appwritecollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDBId,
        conf.appwritecollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDBId,
        conf.appwritecollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDBId,
        conf.appwritecollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
 
  async getPosts(user_id) {
    let queries = [Query.equal("status", "active"),Query.equal("userId", user_id)]
    try {
      return await this.databases.listDocuments(
        conf.appwriteDBId,
        conf.appwritecollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwritebucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwritebucketId, fileId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileId){
   try {
      return this.bucket.getFilePreview(
         conf.appwritebucketId,
         fileId
      )
   } catch (error) {
      console.log(error)
      return false
   }
  }

  
}

const service = new Service();

export default service;
