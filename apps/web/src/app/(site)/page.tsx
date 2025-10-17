import Script from "next/script";

const remoteOrigin = "https://batdongsan01.themeweb4s.com";

type RemoteAssets = {
  html: string;
  scripts: string[];
  jsonLd: string[];
};

function transformRelativeUrls(markup: string): string {
  const attributes = ["href", "src", "data-src", "action"];

  return attributes.reduce((acc, attr) => {
    const regex = new RegExp(`${attr}="\\/(?!\\/)`, "gi");
    return acc.replace(regex, `${attr}="${remoteOrigin}/`);
  }, markup);
}

async function loadRemotePage(): Promise<RemoteAssets> {
  const response = await fetch(remoteOrigin, {
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch remote page: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  if (!bodyMatch) {
    throw new Error("Remote page does not contain a <body> element.");
  }

  let bodyContent = bodyMatch[1];
  const scripts: string[] = [];
  const jsonLd: string[] = [];

  bodyContent = bodyContent.replace(
    /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
    (match, attrs, content) => {
      const srcMatch = attrs.match(/src="([^"]+)"/i);

      if (srcMatch) {
        let scriptSrc = srcMatch[1].trim();

        if (scriptSrc.startsWith("//")) {
          scriptSrc = `https:${scriptSrc}`;
        } else if (scriptSrc.startsWith("/")) {
          scriptSrc = `${remoteOrigin}${scriptSrc}`;
        } else if (!scriptSrc.startsWith("http")) {
          scriptSrc = `${remoteOrigin}/${scriptSrc}`;
        }

        if (!scripts.includes(scriptSrc)) {
          scripts.push(scriptSrc);
        }
      } else if (/type="application\/ld\+json"/i.test(attrs)) {
        const trimmed = content.trim();

        if (trimmed) {
          jsonLd.push(trimmed);
        }
      }

      return "";
    },
  );

  const htmlWithAbsoluteUrls = transformRelativeUrls(bodyContent);

  return {
    html: htmlWithAbsoluteUrls,
    scripts,
    jsonLd,
  };
}

export default async function Home() {
  try {
    const { html, scripts, jsonLd } = await loadRemotePage();

    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {jsonLd.map((content, index) => (
          <Script
            key={`json-ld-${index}`}
            id={`json-ld-${index}`}
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ))}
        {scripts.map((src) => (
          <Script key={src} src={src} strategy="afterInteractive" />
        ))}
      </>
    );
  } catch (error) {
    console.error("Khong the tai du lieu trang nguon:", error);

    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-semibold text-red-600">
          Khong the tai trang tham chieu
        </h1>
        <p className="text-base text-muted-foreground">
          Vui long kiem tra ket noi mang hoac thu lai sau.
        </p>
      </main>
    );
  }
}