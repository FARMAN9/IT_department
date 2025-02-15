import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { HiPencil, HiTrash } from "react-icons/hi";

const ImageCard = ({ pub, handleDelete, handleUpdate, editFile, updating }) => {
  console.log(pub);
  console.log(editFile);
  console.log(updating);
  return (
    <div className="card card-compact bg-base-100 shadow-xl transition duration-300 hover:shadow-2xl hover:scale-105 hover:cursor-pointer hover:shadow-blue-500">
      <figure className="">
        <img
          className="w-100 h-48 object-cover"
          src={pub.image}
          alt={pub._id}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title ">Upload date : {pub.createdAt}</h2>
        <h1 className="card-title ">updated at : {pub.updatedAt}</h1>
        <p>{pub.description}</p>
        <div className="card-actions justify-end">
          <div className="w-full flex justify-between ">
            <div className="">
              <form onSubmit={(e) => handleUpdate(pub._id)} className="mt-4">
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-info w-full "
                  onChange={(e) => setEditFile(e.target.files[0])}
                  accept="image/*" // Browser-level image filter
                />

                <button
                  type="submit"
                  className="btn btn-info mt-2"
                  disabled={!editFile === null || updating}
                >
                  {updating ? "Updateing..." : "Update Image"}
                </button>
              </form>
            </div>
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => handleDelete(pub._id)}
          >
            <HiTrash className="mr-2" size={20} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
