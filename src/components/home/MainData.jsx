import React, {  useRef, useEffect } from "react";
import styled from "styled-components";
import imageLottie from '../../Assets/pick-meals-image.png';
import {
  MoreOptionsIcon,
  StarFilledIcon,
  StarBorderIcon,
  DownloadIcon,
  CopyIcon,
  DeleteIcon,
} from "../common/SvgIcons";

import { changeBytes, convertDates } from "../common/common";
import FileIcons from "../common/FileIcons";

import { handleStarred } from "../common/firebaseApi";
import { toast } from "react-toastify";
import LottieImage from "../common/LottieImage";

// MainData component renders the main data grid with file information and options
const MainData = ({
  files,
  handleOptionsClick,
  optionsVisible,
  handleDelete,
}) => {
  // const [showShareIcons, setShowShareIcons] = useState(false);
  const optionsMenuRef = useRef(null);


  // Handle click outside of the share icons menu to close it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target) &&
        !event.target.closest(".optionsContainer") &&
        !event.target.closest(".shareButton")
      ) {
        // setShowShareIcons(false);
        handleOptionsClick(null); // Close options menu if open
      }
    };

    const handleDocumentClick = (event) => {
      handleOutsideClick(event);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [handleOptionsClick]);

  return (
    <div>
      {/* Header row for the data list */}
      {files.length > 0 && (
        <DataListRow>
          <div>
            <b>
              Name
            </b>
          </div>
          <div className="fileSize">
            <b> Size</b>
          </div>
          
          <div className="modified">
            <b>Last Modified</b>
          </div>
          <div>
            <b>Options</b>
          </div>
        </DataListRow>
      )}

      {/* Render each file in the data list */}
      {files.length > 0 ? (
        files.map((file) => (
          <DataListRow key={file.id}>
            <div>
              {/* Star icon for marking as starred */}
              <p className="starr" onClick={() => handleStarred(file.id)}>
                {file.data.starred ? <StarFilledIcon /> : <StarBorderIcon />}
              </p>
              {/* File details and icon */} 
              <a href={file.data.fileURL} target="_blank" rel="noreferrer">
                <FileIcons type={file.data.contentType} />
                <span title={file.data.filename}>{file.data.filename}</span>
              </a>
            </div>
            <div className="fileSize">{changeBytes(file.data.size)}</div>
            <div className="modified">
              {/* Display last modified date */}
              {convertDates(file.data.timestamp?.seconds)}
            </div>
            <div>
              {/* Options menu for each file */}
              <OptionsContainer
                className="optionsContainer"
                title="Options"
                onClick={() => handleOptionsClick(file.id)}
              >
                <MoreOptionsIcon />
              </OptionsContainer>
              {optionsVisible === file.id && (
                // Display options menu when optionsVisible matches file id
                <OptionsMenu ref={optionsMenuRef}>
                  {/* Various options available for each file */}
                  <span>
                    <a
                      href={file.data.fileURL}
                      download={file.data.name}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <DownloadIcon />
                      {" Download"}
                    </a>
                  </span>
                  <span
                    onClick={() => {
                      // Copy file URL to clipboard
                      navigator.clipboard.writeText(file.data.fileURL);
                      toast.success("Link Copied");
                    }}
                  >
                    <CopyIcon />
                    {" Copy Link"}
                  </span>


                  {/* Delete button */}
                  <span onClick={() => handleDelete(file.id, file.data)}>
                    
                      <DeleteIcon />
                      {" Delete"}
                    
                  </span>
                  {/* Uploaded date */}

                  {/* File size */}
                  <span className="fileSize">
                    {"Size: "}
                    {changeBytes(file.data.size)}
                  </span>
                </OptionsMenu>
              )}
            </div>
          </DataListRow>
        ))
      ) : (
        
        // Render a Lottie animation if no files are available
        <LottieImage
          imagePath={imageLottie}
          text1={"You still dont have any files"}
          text2={"Start by uploading a new file"}

        />
      )}
    </div>
  );
};

// Styled components for the data list row and options menu
const DataListRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr;
  border-bottom: 1px solid #ccc;
  padding: 10px;

  div:last-child {
    justify-self: flex-end;
    padding-right: 10px;
    font-size: 13px;
    position: relative;
  }

  div,
  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 13px;
    b {
      display: flex;
      align-items: center;
    }
    svg {
      font-size: 22px;
      margin: 10px;
    }

    .starr {
      color: #ffc700;
    }
  }

  div {
    text-decoration: none;

    a {
      color: gray;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      span {
        color: #000;
        font-weight: 600;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        width: 20ch;

        @media screen and (max-width: 768px) {
          width: 10ch;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
    .modified {
      display: none;
    }
  }

  @media screen and (max-width: 319px) {
    grid-template-columns: 2fr 1fr;
    .fileSize {
      display: none;
    }
  }
`;

const OptionsContainer = styled.span`
  cursor: pointer;
`;

const OptionsMenu = styled.span`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  border: 2px solid #ccc;
  top: -200%;
  right: 100%;
  cursor: pointer;
  z-index: 10;
  width: max-content;
  min-width: 120px;
  border-radius: 10px;

  &::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: #fff;
    top: 100px;
    right: -8px;
    transform: rotate(45deg);
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
  }

  span {
    width: 100%;
    border-bottom: 2px solid #ccc;
    padding: 10px;
    display: flex;
    align-items: center;

    a {
      color: #000;
    }

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #ccc;
      z-index: 11;
    }
  }

  button {
    background-color: transparent;
    border: none;
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a {
    color: #000;
    background-color: transparent;
  }

  .fileSize,
  .uploaded {
    background-color: #f0f0f0;
    cursor: default;
  }
`;


export default MainData;
