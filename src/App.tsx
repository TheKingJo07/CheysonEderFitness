import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Programs from "@/pages/Programs";
import ProgramDetail from "@/pages/ProgramDetail";
import Offers from "@/pages/Offers";
import Contact from "@/pages/Contact";
import Assessment from "@/pages/Assessment";
import Shop from "@/pages/Shop";
import ShopProduct from "@/pages/ShopProduct";
import Dashboard from "@/pages/Dashboard";
import Messages from "@/pages/Messages";
import NotFound from "@/pages/NotFound";
import DumbbellCursor from "@/components/effects/DumbbellCursor";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <DumbbellCursor />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ShopProduct />} />
          {/* Espace coach (non lié dans la nav publique) */}
          <Route path="/coach/dashboard" element={<Dashboard />} />
          <Route path="/coach/messages" element={<Messages />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
