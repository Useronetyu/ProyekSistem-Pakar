import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { Palette, Globe, Bell, Trash2, Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleDeleteAccount = () => {
    logout();
    toast({
      title: "Akun berhasil dihapus",
      description: "Semua data Anda telah dihapus.",
      variant: "default",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-1 py-8 md:py-16 bg-gradient-cream batik-pattern"
      >
        <div className="container max-w-2xl px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <SettingsIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {t.settingsTitle}
            </h1>
          </div>

          <div className="space-y-4">
            {/* Appearance */}
            <Card variant="elevated">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Palette className="h-5 w-5 text-primary" />
                  {t.settingsAppearance}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">{t.darkMode}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === "id" ? "Aktifkan tema gelap" : "Enable dark theme"}
                    </p>
                  </div>
                  <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                </div>
              </CardContent>
            </Card>

            {/* Language */}
            <Card variant="elevated">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-primary" />
                  {t.settingsLanguage}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">
                      {language === "id" ? "Bahasa Indonesia" : "English"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === "id" ? "Pilih bahasa aplikasi" : "Choose app language"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={language === "id" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage("id")}
                    >
                      ID
                    </Button>
                    <Button
                      variant={language === "en" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage("en")}
                    >
                      EN
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card variant="elevated">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="h-5 w-5 text-primary" />
                  {t.settingsNotifications}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">{t.emailNotifications}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === "id"
                        ? "Terima notifikasi via email"
                        : "Receive notifications via email"}
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account - Danger Zone */}
            <Card variant="elevated" className="border-destructive/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <Trash2 className="h-5 w-5" />
                  {t.settingsAccount}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
                  <div>
                    <p className="font-medium">{t.deleteAccount}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === "id"
                        ? "Hapus akun Anda secara permanen"
                        : "Permanently delete your account"}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        {t.deleteAccount}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {language === "id" ? "Hapus Akun?" : "Delete Account?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {language === "id"
                            ? "Tindakan ini tidak dapat dibatalkan. Semua data Anda akan dihapus secara permanen."
                            : "This action cannot be undone. All your data will be permanently deleted."}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          {language === "id" ? "Batal" : "Cancel"}
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {t.deleteAccount}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Settings;
