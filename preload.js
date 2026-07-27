import { contextBridge } from "electron";
import { readAllProfiles, insertProfile } from "./public/Database/ClientProfileManager.js";

contextBridge.exposeInMainWorld("sqlite", {
  clientProfiles: {
    readAllProfiles,
    insertProfile,
  },
});
