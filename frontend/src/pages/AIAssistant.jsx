import ChatWindow from "../components/ai/ChatWindow";

export default function AIAssistant() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <h1 className="mb-8 text-4xl font-bold text-white">
        AI DevOps Assistant
      </h1>

      <ChatWindow />
    </div>
  );
}
