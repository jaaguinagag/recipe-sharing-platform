"use client";
import { useEffect, useState } from "react";
import { validateSupabaseConnection } from "../../lib/supabase-connection-check";

const ConnectionCheckPage = () => {
  const [isOk, setIsOk] = useState<null | boolean>(null);

  useEffect(() => {
    validateSupabaseConnection().then(setIsOk);
  }, []);

  if (isOk === null) return <div>Checking Supabase connection...</div>;
  if (isOk) return <div className="text-green-600">Supabase connection is OK!</div>;
  return <div className="text-red-600">Supabase connection failed. Check your credentials and RLS policies.</div>;
};

export default ConnectionCheckPage;
