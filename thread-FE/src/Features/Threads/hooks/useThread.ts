import { ChangeEvent, useState } from "react";
import { api } from "../../../libs/api/api";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export function useThread(idThread: Number | null) {
  //ambil id user dari redux(login sesion)
  const idUser = useSelector((item: any) => item.auth.id);
  const [replyData, setReplyData] = useState({
    content: "",
    image: "",
    thread: idThread,
    user: idUser,
  });

  const [thread, setThread] = useState({
    content: "",
    image: "",
  });

  // get data thread and reply from backend
  const { data: threadData, refetch: refetchThread } = useQuery("thread", async () => {
    const response = await api.get("/thread");
    return response.data.threads;
  });

  const PostThread = new FormData();
  PostThread.append("content", thread.content);
  PostThread.append("image", thread.image);

  //post thread
  async function handlePost() {
    const response = await api.post("/thread", PostThread);
    console.log(response.data);
    refetchThread();
  }
  //handle thread
  function handleContent(e: ChangeEvent<HTMLInputElement>) {
    setThread({
      ...thread,
      [e.target.name]: e.target.value,
    });
  }

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0)
      setThread({
        ...thread,
        [e.target.name]: e.target.files[0],
      });
  } //codingan thread berakhir

  const newThread = String(replyData.thread);
  const PostReply = new FormData();
  PostReply.append("content", replyData.content);
  PostReply.append("image", replyData.image);
  PostReply.append("thread", newThread);
  PostReply.append("user", replyData.user);
  //post Reply

  async function handlePostReply() {
    try {
      const response = await api.post("/reply", PostReply);
      console.log(response.data);
      refetchThread();
    } catch (err) {
      console.log({ err });
    } finally {
      refetchThread();
    }
  }

  function handleContentReply(e: ChangeEvent<HTMLInputElement>) {
    setReplyData({
      ...replyData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageReply(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0)
      setReplyData({
        ...replyData,
        [e.target.name]: e.target.files[0],
      });
  }

  return { threadData, thread, handleContent, handleImage, handlePost, handlePostReply, handleImageReply, handleContentReply };
}
