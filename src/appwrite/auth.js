import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    // return null;
    //but i dont think so it is needed as in case no user is logged in it will anyway return null
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
      //   deleteSession("current"): This is used to log out from the current session only—that is, the active session in the browser or client making the request. You’re telling Appwrite to terminate the session you're currently using, but other sessions on different devices or browsers will remain active.
      //   deleteSessions(): This is used to delete all sessions for the logged-in user across all devices and browsers. It wipes out every active session, not just the current one. So, if the user is logged in on their phone, laptop, or other devices, this will log them out from everywhere.
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
