import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {  auth, db, storage } from "../../firebase/firebase";
import { getFilesForUser } from "../common/firebaseApi";
import { changeBytes } from "../common/common";
import {
  FileFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import FileUploadModal from "../upload/FileUploadModal";
import { toast } from "react-toastify";

import { Button, FloatButton, Layout, Menu, theme } from 'antd';
import Data from '../home/Data';
import { useAuth } from '../../contexts/authContext'

const { Header, Sider, Content } = Layout;
const SideBarFinal = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { currentUser } = useAuth()

  const [size, setSize] = useState(0);
  const [files, setFiles] = useState([]);
  var storageVal = 0;

  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0].name)
      console.log(e.target.files[0])
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setSelectedFile("");
    setUploading(true);

    try {
      const storageRef = ref(storage, `files/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      // Check if snapshot.totalBytes is defined, use 0 if not
      const size = snapshot.metadata.size || 0;

      // Associate the file with the authenticated user ID
      await addDoc(collection(db, "myfiles"), {
        userId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
        filename: file.name,
        fileURL: url,
        size: size,
        contentType: snapshot.metadata.contentType,
        starred: false,
      });
      toast.success("File Uploaded Successfully");
      // Reset state and close modal
      setUploading(false);
      setFile(null);
      setOpen(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      toast.error("Error uploading file. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Subscribe to user's files and update state
        const unsubscribeFiles = await getFilesForUser(user.uid, setFiles);
        for(let file of files){
          storageVal += file.data.size;
          console.log("file storage  :",changeBytes(file.data.size));
        }

        // Cleanup the user subscription when the component unmounts
        // return () => {
        //   unsubscribeFiles();

        // };
      }
    });

    // Cleanup the user subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  const [storageFile, setStorageFile] = useState("");

  useEffect(() => {
    const sizes = files?.reduce((sum, file) => sum + file.data.size, 0);
    setSize(sizes);
    const storageSize = changeBytes(sizes);
    setStorageFile(storageSize);
  }, [files]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <FileFilled />,
              label: 'Files',
            },
            {
              key: '2',
              icon: <PieChartOutlined />,
              label: storageFile + '/15Go' ,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >

            Hello {currentUser.displayName }.

          <Data></Data>

          <FloatButton
          onClick={() => {
            setOpen(true);
          }}  
            shape="circle"
            type="primary"
            style={{
              right: 65,
              bottom: 60,
            }}
            icon={<UploadOutlined
                />}
          />
          <FileUploadModal
            open={open}
            setOpen={setOpen}
            handleUpload={handleUpload}
            uploading={uploading}
            handleFile={handleFile}
            selectedFile={selectedFile}
          />
          
        </Content>
      </Layout>
    </Layout>
  );
};
export default SideBarFinal;