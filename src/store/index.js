import Vue from "vue";
import Vuex from "vuex";
import * as fb from "@/firebase";
import router from "@/router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {},
    otherUserProfile: {},
    usersList: {},
    songsList: {},
    musicPlayerData: {},
    errorMessage: "",
    uploadStatus: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setOtherUserProfile(state, val) {
      state.otherUserProfile = val;
    },
    setUsersList(state, val) {
      state.usersList = val;
    },
    setSongsList(state, val) {
      state.songsList = val;
    },
    setMusicPlayerData(state, val) {
      state.musicPlayerData = val;
    },
    setErrorMessage(state, val) {
      state.errorMessage = val;
    },
    setUploadStatus(state, val) {
      state.uploadStatus = val;
    }
  },

  actions: {
    //
    // Authentication
    //
    async loginWithGoogle({ dispatch }) {
      dispatch("setErrorMessage", "");
      // sign user in using a popup.
      fb.provider.addScope("profile");
      fb.provider.addScope("email");
      fb.auth
        .signInWithPopup(fb.provider)
        .then(function (result) {
          //console.log(result);
          // This gives you a Google Access Token.
          //var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;

          // Is this a new account?
          if (result.additionalUserInfo.isNewUser) {
            // create user profile object in usersCollection

            fb.usersCollection.doc(user.uid).set({
              name: user.displayName,
              email: user.email,
              uid: user.uid,
              memberSince: new Date(),
              profileImage: user.photoURL
            });
          }

          // fetch user profile and set in state
          dispatch("fetchUserProfile", user, true);
        })
        .catch(function (error) {
          console.log("There was an error: " + error);
        });
    },

    async login({ dispatch }, form) {
      // sign user in
      dispatch("setErrorMessage", "");
      fb.auth
        .signInWithEmailAndPassword(form.email, form.password)
        .then(function (result) {
          var { user } = result;
          // fetch user profile and set in state
          dispatch("fetchUserProfile", user);
        })
        .catch(function (error) {
          dispatch("setErrorMessage", error.message);
        });
    },

    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect to /home
      commit("setUserProfile", {});
      if (router.currentRoute.path !== "/") {
        router.push("/");
      }
    },

    async signup({ dispatch }, form) {
      let profilePic;
      let filename;
      let ext;

      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );
      // create user profile
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        email: form.email,
        uid: user.uid,
        memberSince: new Date()
      });

      // upload avatar to storage
      if (form.profileImage) {
        filename = form.profileImage.name;
        ext = form.profileImage.name.slice(filename.lastIndexOf("."));
        await fb.storageCollection
          .ref("users/" + user.uid + ext)
          .put(form.profileImage)
          .then(function (result) {
            result.ref.getDownloadURL().then(function (result) {
              profilePic = result;
              // create user profile object in userCollections
              fb.usersCollection.doc(user.uid).update({
                profileImage: profilePic
              });
              // fetch user profile and set in state
              dispatch("fetchUserProfile", user, true);
            });
          });
      }
      // fetch user profile and set in state
      dispatch("fetchUserProfile", user, true);
    },

    async setErrorMessage({ commit }, message) {
      // set error message in state
      commit("setErrorMessage", message);
    },

    async fetchUserProfile({ commit }, user, redirect = false) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      // change route to home
      if (
        router.currentRoute.path === "/login" ||
        router.currentRoute.path === "/createuser"
      ) {
        router.push("/");
      }
      if (redirect) {
        router.go();
      }
    },

    async fetchOtherUserProfile({ commit }, searchUID) {
      // fetch user profile
      const otherUserProfile = await fb.usersCollection.doc(searchUID).get();

      // set user profile in state
      commit("setOtherUserProfile", otherUserProfile.data());
    },

    async fetchUsersList({ commit }, search) {
      // fetch user profile
      const usersListSnapshot = await fb.usersCollection.get();
      const usersList = usersListSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data()
      }));

      // set user profile in state
      commit("setUsersList", usersList);
    },

    async updateProfile({ dispatch }, user) {
      let profilePic;
      let AuthUser = fb.auth.currentUser;
      if (user.profileImage) {
        const filename = user.profileImage.name;
        const ext = user.profileImage.name.slice(filename.lastIndexOf("."));
        await fb.storageCollection
          .ref("users/" + AuthUser.uid + ext)
          .put(user.profileImage)
          .then(function (result) {
            result.ref.getDownloadURL().then(function (result) {
              profilePic = result;
              // update user object
              fb.usersCollection.doc(AuthUser.uid).update({
                profileImage: !profilePic ? AuthUser.profileImage : profilePic
              });
              dispatch("fetchUserProfile", { uid: AuthUser.uid });
            });
          });
      }
      if (user.name) {
        fb.usersCollection.doc(AuthUser.uid).update({
          name: !user.name ? AuthUser.name : user.name
        });
      }
      // fetch user profile and set in state
      await dispatch("fetchUserProfile", { uid: AuthUser.uid });
    },

    async uploadSong({ dispatch }, form) {
      let AuthUser = fb.auth.currentUser;
      let uploadedSong;
      dispatch("setUploadStatus", "uploading");

      // upload avatar to storage
      const filename = form.songFile.name;
      const filenameNoSpaces = form.songFile.name
        .split(".", 1)[0]
        .replace(/[^a-zA-Z]/g, "");
      const ext = form.songFile.name.slice(filename.lastIndexOf("."));
      await fb.storageCollection
        .ref(
          "songs/" +
            AuthUser.uid +
            filenameNoSpaces +
            Math.floor(Math.random() * 100) +
            ext
        )
        .put(form.songFile)
        .then(function (result) {
          result.ref.getDownloadURL().then(function (result) {
            uploadedSong = result;
            // create user profile object in userCollections
            fb.songsCollection
              .doc(
                AuthUser.uid +
                  filenameNoSpaces +
                  Math.floor(Math.random() * 100)
              )
              .set({
                uid: AuthUser.uid,
                artistName: form.artistName,
                artistNameLower: form.artistName.toLowerCase(),
                songName: form.songName,
                songNameLower: form.songName.toLowerCase(),
                genre: form.songGenre,
                likes: [],
                songURL: uploadedSong,
                uploadDate: new Date()
              })
              .then(function (result) {
                dispatch("getSongs");
                dispatch("setUploadStatus", "complete");
              });
          });
        });
    },

    async likeSong({ dispatch }, data) {
      if (this.state.userProfile.uid) {
        const snapshot = await fb.songsCollection
          .where("songURL", "==", data.song.songURL)
          .where("uid", "==", data.song.uid)
          .where("songNameLower", "==", data.song.songNameLower)
          .get();
        if (snapshot.size === 1) {
          if (
            snapshot.docs[0].data().likes.includes(this.state.userProfile.uid)
          ) {
            await fb.songsCollection.doc(snapshot.docs[0].id).update({
              likes: fb.firebase.default.firestore.FieldValue.arrayRemove(
                this.state.userProfile.uid
              )
            });
          } else {
            await fb.songsCollection.doc(snapshot.docs[0].id).update({
              likes: fb.firebase.default.firestore.FieldValue.arrayUnion(
                this.state.userProfile.uid
              )
            });
          }

          let playerData = {
            link: snapshot.docs[0].data().songURL,
            artist: snapshot.docs[0].data().artistName,
            song: snapshot.docs[0].data().songName,
            likedSong: snapshot.docs[0]
              .data()
              .likes.includes(this.state.userProfile.uid)
              ? 0
              : 1,
            uid: snapshot.docs[0].data().uid,
            songNameLower: snapshot.docs[0].data().songNameLower
          };
          store.commit("setMusicPlayerData", playerData);
        }
      }
    },

    async getSongs({ dispatch }, searchData) {
      let searchValueLower;
      let searchField;
      if (searchData && searchData.hasOwnProperty("value")) {
        searchValueLower = searchData.value.toLowerCase();
        searchField = searchData.field;
      } else if (searchData && searchData.hasOwnProperty("uid")) {
        searchValueLower = searchData.uid;
        searchField = "uid";
      } else {
        searchValueLower = "mentally detached";
        searchField = "artistNameLower";
      }
      const snapshot = await fb.songsCollection
        .where(searchField, "==", searchValueLower)
        .get();
      const songList = snapshot.docs.map((doc) => ({
        likedSong: doc.data().likes.includes(this.state.userProfile.uid)
          ? 1
          : 0,
        ...doc.data()
      }));
      store.commit("setSongsList", songList);
    },

    async setUploadStatus({ dispatch }, status) {
      store.commit("setUploadStatus", status);
    },

    async setPlayerData({ dispatch }, setPlayerData) {
      let playerData;
      playerData =
        setPlayerData &&
        setPlayerData.hasOwnProperty("link") &&
        setPlayerData.hasOwnProperty("artist") &&
        setPlayerData.hasOwnProperty("song") &&
        setPlayerData.hasOwnProperty("songNameLower") &&
        setPlayerData.hasOwnProperty("likedSong")
          ? setPlayerData
          : {
              link: "",
              artist: "",
              song: "",
              likedSong: 0,
              uid: "",
              songNameLower: ""
            };

      store.commit("setMusicPlayerData", playerData);
    }
  }
});

export default store;
