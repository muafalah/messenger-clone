import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/Sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

export default async function ConversationsLayout({
  children,
}: ConversationsLayoutProps) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
