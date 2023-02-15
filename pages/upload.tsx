import React, { useState } from "react";
import { storage, db } from "../utils/db/firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const upload = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  //   write upload function using typescript
  const upload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgresspercent(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  //   submit form function to save data to firebase
  const submitFrom = async (e) => {
    e.preventDefault();

    // get data from the form
    const name = e.target.name.value;
    const rate = e.target.rate.value;
    const type = e.target.type.value;

    // create data object
    const data = {
      name,
      rate,
      imgUrl,
    };

    // save data to firebase
    try {
      const docRef = await addDoc(collection(db, type), data);

      console.log("Document written with ID: ", docRef.id);
      //   clear form
      e.target.name.value = "";
      e.target.rate.value = "";
      setImgUrl(null);
      setProgresspercent(0);
      // send success message
      return alert("Movie added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form method="POST" onSubmit={submitFrom}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-8">
                    <div className="col-span-3 sm:col-span-2">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full flex-1 justify-center rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-8">
                    <div className="col-span-3 sm:col-span-2">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="number"
                          name="rate"
                          id="rate"
                          min={0}
                          max={10}
                          className="block w-full flex-1 justify-center rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Rate"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3 type select */}
                  <div className="grid grid-cols-8">
                    <div className="col-span-3 sm:col-span-2">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <select
                          id="type"
                          name="type"
                          className="block w-full flex-1 justify-center rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="watch_list">Anime</option>
                          <option value="Movie">Movie</option>
                          <option value="Series">Tv Show</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>

                    {/* upload image preview */}
                    {imgUrl && (
                      <div className="mt-1 flex justify-center">
                        <div className="flex-shrink-0 inline-block rounded-md overflow-hidden h-48 w-48">
                          <img
                            className="h-full w-full object-cover"
                            src={imgUrl}
                            alt="uploaded image"
                          />
                        </div>
                      </div>
                    )}

                    {/* hide this when upload is done */}
                    {progresspercent < 99 && (
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={upload}
                              />
                            </label>
                          </div>
                          {/* progress */}
                          {progresspercent > 0 && (
                            <p>Progress: {progresspercent}%</p>
                          )}
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default upload;
