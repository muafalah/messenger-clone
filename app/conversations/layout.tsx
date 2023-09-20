import getConversations from "@/actions/getConversations";
import Sidebar from "@/components/Sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

export default async function ConversationsLayout({
  children,
}: ConversationsLayoutProps) {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
