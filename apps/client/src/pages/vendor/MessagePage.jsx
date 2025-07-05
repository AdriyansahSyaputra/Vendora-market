import { useState } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import MessageStatCards from "@/components/Layouts/vendor/Message/MessageStatCards";
import ChatModal from "@/components/Layouts/vendor/Message/ChatModal";
import { Card, CardContent } from "@/components/ui/card";
import SearchFilter from "@/components/Layouts/vendor/Message/SearchFilter";
import CardMessage from "@/components/Layouts/vendor/Message/CardMessage";
import { Helmet } from "react-helmet-async";

const MessagePage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?u=alex",
      preview: "Hi, I have a question about my order #INV-123. Can you help?",
      isRead: false,
      history: [
        {
          sender: "buyer",
          text: "Hi, I have a question about my order #INV-123. Can you help?",
        },
      ],
    },
    {
      id: 2,
      name: "Samantha Bee",
      avatar: "https://i.pravatar.cc/150?u=samantha",
      preview: "Thank you for the fast shipping! The product is great.",
      isRead: true,
      history: [
        {
          sender: "buyer",
          text: "Thank you for the fast shipping! The product is great.",
        },
      ],
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?u=michael",
      preview:
        "I would like to request a return for my item. It arrived damaged.",
      isRead: false,
      history: [
        {
          sender: "buyer",
          text: "I would like to request a return for my item. It arrived damaged.",
        },
        {
          sender: "seller",
          text: "We're so sorry to hear that! Could you please provide a photo of the damage?",
        },
      ],
    },
  ]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReplyClick = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    setMessages((prev) =>
      prev.map((m) => (m.id === message.id ? { ...m, isRead: true } : m))
    );
  };

  const handleSendMessage = (messageId, text) => {
    const updatedMessages = messages.map((msg) => {
      if (msg.id === messageId) {
        const newHistory = [...msg.history, { sender: "seller", text }];
        return { ...msg, history: newHistory };
      }
      return msg;
    });
    setMessages(updatedMessages);
    setSelectedMessage((prev) => ({
      ...prev,
      history: [...prev.history, { sender: "seller", text }],
    }));
  };

  return (
    <>
      <Helmet title="Messages" />

      <div className="flex min-h-screen w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Kontainer untuk Topbar dan Konten Utama */}
        <div className="flex flex-col w-full">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          {/* Konten Utama Halaman */}
          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-4">
            <div className="flex flex-col gap-4 md:gap-8 space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
                <p className="text-muted-foreground">
                  View and manage your messages.
                </p>
              </div>

              <MessageStatCards />
              <Card>
                <CardContent className="pt-6">
                  <SearchFilter />

                  <div className="space-y-4">
                    {messages.map((message) => (
                      <CardMessage
                        key={message.id}
                        message={message}
                        handleReplyClick={handleReplyClick}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <ChatModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                messageData={selectedMessage}
                onSendMessage={handleSendMessage}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MessagePage;
