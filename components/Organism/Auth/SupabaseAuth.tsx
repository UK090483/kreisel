import Dialog from "components/Atoms/Dialog/DialogBox";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import * as Portal from "@radix-ui/react-portal";

const SupabaseAuth = ({ close }: { close: () => void }) => {
  const supabaseClient = useSupabaseClient();

  return (
    <Portal.Root className="w-screen h-screen backdrop-blur-lg animate-fadeIn fixed inset-0 z-50 flex justify-center items-center">
      <Dialog onClose={close} className="animate-scaleIn">
        <Auth
          appearance={{ theme: { ...ThemeSupa } }}
          supabaseClient={supabaseClient}
          providers={[]}
          magicLink
          socialLayout="horizontal"
          view={"magic_link"}
          localization={{
            variables: {
              forgotten_password: {
                button_label: "passwort vergessen ?",
                link_text: "passwort vergessen ?",
              },
              sign_in: {},
            },
          }}
        />
      </Dialog>
    </Portal.Root>
  );
};

export default SupabaseAuth;
