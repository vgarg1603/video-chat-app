import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser.js';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';
import { StreamChat } from 'stream-chat';
import toast from 'react-hot-toast';
import ChatLoader from '../components/ChatLoader.jsx';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import CallButton from '../components/CallButton.jsx';


const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {

  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser
  })

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Init stream chat client");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        }, tokenData.token);

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currentChannel.watch();

        setChatClient(client);
        setChannel(currentChannel)

      } catch (error) {
        console.log(error);
        toast.error("Couldn't connect to chat. ");
      } finally {
        setLoading(false);
      }
    }

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if(channel) {
      const callURL = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call join me here: ${callURL}`,
      });

      toast.success('Video call link sent successfully');
    }
  }

  if (loading || !chatClient || !channel) return <ChatLoader />;


  return (
    <div className='h-[93vh]'>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className='w-full relative'>
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
        </Channel>

        <Thread />
      </Chat>
    </div>
  );
}

export default ChatPage;
