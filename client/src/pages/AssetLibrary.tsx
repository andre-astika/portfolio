import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { FileImage, FileText, FolderOpen, Loader2, Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

const MAX_FILE_BYTES = 10 * 1024 * 1024;

function formatFileSize(sizeBytes: number) {
  return sizeBytes < 1024 * 1024
    ? `${Math.max(1, Math.round(sizeBytes / 1024))} KB`
    : `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function AssetLibraryContent() {
  const { user, loading } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const utils = trpc.useUtils();
  const canManageAssets = Boolean(user && user.role === "admin");
  const assetQuery = trpc.assets.list.useQuery(undefined, { enabled: canManageAssets });
  const uploadAsset = trpc.assets.upload.useMutation({
    onSuccess: async () => {
      setSelectedFile(null);
      await utils.assets.list.invalidate();
      toast.success("Asset uploaded to file storage.");
    },
    onError: error => toast.error(error.message),
  });

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file && file.size > MAX_FILE_BYTES) {
      toast.error("Choose a file that is 10 MB or smaller.");
      event.target.value = "";
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Select an image or PDF first.");
      return;
    }

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("The selected file could not be read."));
      reader.onload = () => resolve(String(reader.result));
      reader.readAsDataURL(selectedFile);
    });

    const dataBase64 = dataUrl.split(",", 2)[1];
    if (!dataBase64) {
      toast.error("The selected file could not be encoded.");
      return;
    }

    uploadAsset.mutate({
      fileName: selectedFile.name,
      contentType: selectedFile.type,
      dataBase64,
    });
  };

  if (loading) {
    return <div className="grid min-h-[60vh] place-items-center"><Loader2 className="animate-spin" /></div>;
  }

  if (!canManageAssets) {
    return (
      <section className="mx-auto max-w-xl py-16 text-center">
        <FolderOpen className="mx-auto mb-5 h-10 w-10 text-muted-foreground" />
        <h1 className="text-2xl font-semibold">Asset Library is owner-only</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Sign in with the portfolio owner account to upload and manage stored images and documents.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl py-6">
      <header className="mb-8 flex flex-col gap-3 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Owner workspace</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Asset Library</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Upload JPG, PNG, WEBP, or PDF files up to 10 MB. Files are stored in S3; only their metadata is kept in the database.
          </p>
        </div>
      </header>

      <div className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <label htmlFor="portfolio-asset" className="text-sm font-medium">Select asset</label>
            <Input
              id="portfolio-asset"
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              onChange={handleFileSelect}
            />
            <p className="text-xs text-muted-foreground">{selectedFile ? `${selectedFile.name} · ${formatFileSize(selectedFile.size)}` : "JPG, PNG, WEBP, or PDF · 10 MB maximum"}</p>
          </div>
          <Button onClick={handleUpload} disabled={!selectedFile || uploadAsset.isPending}>
            {uploadAsset.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            Upload asset
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {assetQuery.isLoading ? (
          <div className="col-span-full flex items-center gap-3 rounded-xl border p-6 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading stored assets…</div>
        ) : assetQuery.data?.length ? (
          assetQuery.data.map(asset => {
            const isImage = asset.contentType.startsWith("image/");
            return (
              <a key={asset.id} href={asset.storageUrl} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-xl border bg-card text-card-foreground transition-shadow hover:shadow-md">
                <div className="grid aspect-[16/10] place-items-center bg-muted">
                  {isImage ? <img src={asset.storageUrl} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" /> : <FileText className="h-10 w-10 text-muted-foreground" />}
                </div>
                <div className="flex items-start gap-3 p-4">
                  {isImage ? <FileImage className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /> : <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{asset.fileName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{asset.contentType} · {formatFileSize(asset.sizeBytes)}</p>
                  </div>
                </div>
              </a>
            );
          })
        ) : (
          <div className="col-span-full rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">No stored assets yet. Upload your first portfolio file above.</div>
        )}
      </div>
    </section>
  );
}

export default function AssetLibrary() {
  return <DashboardLayout><AssetLibraryContent /></DashboardLayout>;
}
