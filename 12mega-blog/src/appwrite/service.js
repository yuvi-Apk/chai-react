import config from "@/config/config";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  // ---------- posts ----------

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: slug,
        data: { title, content, featuredImage, status, userId },
      });
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: slug,
        data: { title, content, featuredImage, status },
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tablesDB.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCollectionId,
        queries,
      });
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  // ---------- file upload ----------

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: config.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview({
      bucketId: config.appwriteBucketId,
      fileId,
    });
  }
}

const service = new Service();

export default service;
