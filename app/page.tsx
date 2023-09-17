"use client";
import React, { useState } from "react";
import { toPng } from "html-to-image";
import { useRef } from "react";
import Image from "next/image";
import verified from "../public/verified.svg";
import blueVerified from "../public/blue-verified.svg";
import profile from "../public/profile.svg";
import profileDark from "../public/profile-dark.svg";
import dots from "../public/dots.svg";
import dotsDark from "../public/dots-dark.svg";
import NextInputComponent from "@/components/NextComponents/NextInputComponent";
import NextTextareaComponent from "@/components/NextComponents/NextTextareaComponent";
import { useTheme } from "next-themes";
import banDark from "../public/slash_ban.svg";
import ban from "../public/ban-solid.svg";
import NextRadioButton from "@/components/NextComponents/NextRadioButton";
// import "bootstrap/dist/css/bootstrap.min.css";

const Canvas = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const [dragged, setDragged] = useState<boolean>(false);

  const inputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState<
    "blue" | "gold" | "none"
  >("none");
  const [userData, setUserData] = useState({
    name: "Raviraj Solanki",
    userId: "@ravirajsolanki_",
    tweet:
      "Unleash your creativity with our cutting-edge tweet post maker – design tweets that shine in just a few clicks!",
  });
  const handleButtonClick = () => {
    // Trigger the input element's click event
    inputRef.current.click();
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log({ file });
    if (file) {
      let fileType = file.type;
      let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
          let fileURL = fileReader.result;

          setSelectedImage(`${fileURL}`);
          // let imgTag = ``;
          // dropArea.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
      } else {
        alert("This is not an Image File!");
        setDragged(false);
        // dropArea.classList.remove("active");
        // dragText.textContent = "Drag & Drop to Upload File";
      }
    }
  };

  const saveImageToLocal = () => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setProfileImage = () => {
    if (selectedImage) {
      return selectedImage;
    } else if (theme === "dark") {
      return profileDark;
    } else return profile;
  };

  function viewfile(e: React.DragEvent<HTMLDivElement>) {
    const file = e.dataTransfer.files[0];
    console.log({ file1: file });
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        let fileURL = fileReader.result;

        setSelectedImage(`${fileURL}`);
        // let imgTag = ``;
        // dropArea.innerHTML = imgTag;
      };
      fileReader.readAsDataURL(file);
    } else {
      alert("This is not an Image File!");
      setDragged(false);
      // dropArea.classList.remove("active");
      // dragText.textContent = "Drag & Drop to Upload File";
    }
  }
  return (
    <div className=" box-border p-2 w-full h-full flex flex-col gap-4 md:flex-row">
      <div className="bg-gray-100 dark:bg-[#3B3B3B] border-[1px] border-[#E1E1EF] dark:border-[#b0b0cc93]    p-5 h-[440px] w-full overflow-auto md:h-full flex justify-center items-center">
        <div
          ref={ref}
          className="bg-white dark:bg-black h-[35rem] w-[35rem] min-w-[35rem] flex flex-col items-center justify-center"
        >
          {/* Profile part */}
          <div className="flex items-start w-[450px] min-w-[450px]">
            <div className="min-h-[50px] min-w-[50px] mr-[12px]">
              <Image
                src={setProfileImage()}
                width={50}
                height={50}
                alt="Picture of the author"
                className="!h-[50px] rounded-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-start">
                <p className="text-[#0F1419] dark:text-[#cccccc] font-semibold text-[15px]">
                  {userData.name}
                </p>
                {selectedCheckbox !== "none" && (
                  <Image
                    src={selectedCheckbox === "gold" ? verified : blueVerified}
                    width={20}
                    height={20}
                    alt=""
                    className="ml-[3px] max-w-[20px] max-h-[20px]"
                  />
                )}
              </div>
              <p className="text-[#536471] dark:text-[#A9B3C1] text-[15px]">
                {userData.userId.toLowerCase()}
              </p>
            </div>
            <div className="ml-auto">
              <Image
                src={theme === "dark" ? dots : dotsDark}
                width={20}
                height={20}
                alt=""
                className="ml-[3px] max-w-[20px] max-h-[20px]"
              />
            </div>
          </div>
          {/* Text part */}
          <div className="w-[450px] min-w-[450px] mt-4">
            <p className="text-[#0F1419] dark:text-[#cccccc] text-[17px] text-left">
              {userData.tweet}
            </p>
          </div>
          {/* Footer part */}
          <div></div>
        </div>
      </div>

      <div className="flex flex-col w-full m-auto gap-5 border-[1px] border-[#E1E1EF] dark:border-[#b0b0cc93]   bg-[#F3F4F6]  p-5 dark:bg-[#3B3B3B]">
        {/* <input
          accept="images/*"
          type="file"
          name="img"
          id="img"
          placeholder="input"
          onChange={handleImageChange}
        /> */}
        <div className="flex  gap-5">
          <div
            className={`drag-image ${dragged && "active"}`}
            onDragOver={(e) => {
              e.preventDefault();

              setDragged(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();

              setDragged(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              viewfile(e);
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="image"
                onClick={() => {
                  setSelectedImage("");
                }}
              />
            ) : (
              <>
                <div className="icon">
                  <i className="fas fa-cloud-upload-alt"></i>
                </div>
                {dragged ? (
                  <h6>Release to Upload File</h6>
                ) : (
                  <>
                    <h6>Drag & Drop File Here</h6>
                    <span>OR</span>
                    <button onClick={handleButtonClick}>Browse File</button>
                    <input
                      id="inputFile"
                      type="file"
                      onChange={handleImageChange}
                      ref={inputRef}
                      hidden
                    />
                  </>
                )}
              </>
            )}
          </div>
          <div>
            <h4>Select Verification Type</h4>
            <div
              className="flex flex-col gap-2 btn-group w-10"
              data-toggle="buttons"
            >
              <label
                className={`shadow-md hover:shadow-lg  dark:shadow-gray-500 bg-white dark:bg-black  p-3 ${
                  selectedCheckbox === "none" &&
                  " rounded  border-[3px] border-[#000000] dark:border-[#ffff]"
                }`}
              >
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  onClick={() => setSelectedCheckbox("none")}
                  autoComplete="off"
                  hidden
                />
                <Image
                  src={theme === "dark" ? banDark : ban}
                  width={20}
                  height={20}
                  alt=""
                />
              </label>

              <label
                className={`shadow-md hover:shadow-lg dark:shadow-gray-500 bg-white dark:bg-black  p-3 ${
                  selectedCheckbox === "blue" &&
                  "rounded border-[3px]   border-[#1d9bf0]   hover:shadow-lg  dark:shadow-[#1d9bf0]-500"
                }`}
              >
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  onClick={() => setSelectedCheckbox("blue")}
                  autoComplete="off"
                  hidden
                />
                <Image src={blueVerified} width={20} height={20} alt="" />
              </label>
              <label
                className={`shadow-md hover:shadow-lg   dark:shadow-gray-500 bg-white dark:bg-black  p-3 ${
                  selectedCheckbox === "gold" &&
                  "rounded border-[3px] border-[#ebd456]  hover:shadow-lg  dark:shadow-[#ebd456]-500"
                }`}
              >
                <input
                  type="radio"
                  name="options"
                  id="option3"
                  onClick={() => setSelectedCheckbox("gold")}
                  autoComplete="off"
                  hidden
                />
                <Image src={verified} width={20} height={20} alt="" />
              </label>
            </div>
          </div>
        </div>
        {/* <div className="flex gap-2">
          <NextRadioButton
            label="none"
            name="verified"
            title="None"
            value={selectedCheckbox}
            setValue={() => setSelectedCheckbox("none")}
          />
          <NextRadioButton
            label="blue"
            name="verified"
            title="Blue"
            value={selectedCheckbox}
            setValue={() => setSelectedCheckbox("blue")}
          />
          <NextRadioButton
            label="gold"
            name="verified"
            title="Gold"
            value={selectedCheckbox}
            setValue={() => setSelectedCheckbox("gold")}
          />
        </div> */}
        <div className="flex flex-col">
          <NextInputComponent
            label="Name"
            setValue={(e) => {
              setUserData((pre) => ({ ...pre, name: e.target.value }));
            }}
            value={userData.name}
          />
          <NextInputComponent
            label="Username"
            setValue={(e) => {
              setUserData((pre) => ({ ...pre, userId: e.target.value }));
            }}
            value={userData.userId}
          />
        </div>
        <div>
          <NextTextareaComponent
            label="Tweet Text"
            value={userData.tweet}
            setValue={(e) =>
              setUserData((pre) => ({ ...pre, tweet: e.target.value }))
            }
          />
        </div>
        <button
          onClick={saveImageToLocal}
          className="shadow-md hover:shadow-lg  dark:shadow-gray-500 bg-white dark:bg-black w-auto p-3 text-black dark:text-white text-xl rounded-md border-[1px] border-[#E1E1EF] dark:border-[#b0b0cc93]"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Canvas;
