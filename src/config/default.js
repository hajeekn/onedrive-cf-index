/* eslint-disable no-irregular-whitespace */
const config = {
  /**
   * Configure the account/resource type for deployment (with 0 or 1)
   * - accountType: controls account type, 0 for global, 1 for china (21Vianet)
   * - driveType: controls drive resource type, 0 for onedrive, 1 for sharepoint document
   *
   * Followed keys is used for sharepoint resource, change them only if you gonna use sharepoint
   * - hostName: sharepoint site hostname (e.g. 'name.sharepoint.com')
   * - sitePath: sharepoint site path (e.g. '/sites/name')
   * !Note: we do not support deploying onedrive & sharepoint at the same time
   */
  type: {
    accountType: 0,
    driveType: 0,
    hostName: null,
    sitePath: null
  },

  // refresh_token: '0.AT4AoSURqNYuwkOeJ1fTTBi6ylBijPt85jZKpwNhhuvieQg-AM8.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P-nKS7ykTG8syKNK_PIjX3D5Qlzqi3po7ZNEOZCV9r82XsdJpY4fyfhxYN521_I4neKRLJy0_SRhtEq6ike7XGMlXLpa46K1MTt54X67fkAQZla7sp4GJd4mfYp4PVXvzGjISPdr_lAb2T0Otx6neZUZAA-28JlbX5u6EAsU_sjwk2BA-mYCeibhtrk4W0WdDF7dA9TJFw_rKkzyiKMFJfZzZJZfKLx0wu4fgboi11U4d1Q62uA6-ho-H4rqa4hmNLHGOY84iTtFzJ0WF46K_l5V0Iwl7LiQRnPmXfsTdHahvhA7pJfGtj3ihcaWk1bnEGUK0Bxh_dhUmY_rvruToNZQk8LzF0LfKTwqyOnSG4qdST8I2oFQtQrkilZTygrsBt6NwgWAFHeKQeZv8Zv4nlIrq5ruGA2exx5xkNTgJrh4XYyaS63riXkP-lzdqANfAk0B3Ck9y7LDHmFtQ16my65jYpjpDAUMAMQGedRPrTzf6j0evuy5hDXba6DRbTrWiz07j3HVtVjzIF4oM4a-BPLLRhQw1j2HsjAwR-3N3u1WqzVjd282HLIPWVdagZk_bso8D-IdXXXFtOpO-CUqV2E-QnQyeDuLXdBEgsi4Rl6bjzvYY0f0EXCzhLabJtGSWWm4bqsKaeGaL4CqUyqzdt7e649XE20FFrZsb6ypiXhHA3Sfcg28zwgMZZq3a7lO4SnauCQznVyy9vKpPcxZPQEV8q2JnogbChGBsQvAPZC05-lo2grz841_eUehuN5F9R3o2iew3kt784BYvfBM9yhJqoARtMUYu6IGrmUQSCnoNKdk0YfwiwFCT4hR4MrrT467wJt7TqM_QzzrqekhTUvtAnTsB4E56yYQPQb-KfzWJSOxdoJHnC8VE5evFaf8UAXK9sUkHLgLZCl22XXe_oW9v-cr4iP8_Pp5S67aQpQo5-st7BL5ZRp',
  client_id: 'fb8c6250-e67c-4a36-a703-6186ebe27908',
  client_secret: CLIENT_SECRET,

  /**
   * Exactly the same `redirect_uri` in your Azure Application
   */
  redirect_uri: 'http://localhost',

  /**
   * The base path for indexing, all files and subfolders are public by this tool. For example: `/Public`.
   */
  base: '/',

  /**
   * Feature: Pagination when a folder has multiple(>${top}) files
   * - top: specify the page size limit of the result set, a big `top` value will slow down the fetching speed
   */
  pagination: {
    enable: true,
    top: 100 // default: 200, accepts a minimum value of 1 and a maximum value of 999 (inclusive)
  },

  /**
   * Feature Caching
   * Enable Cloudflare cache for path pattern listed below.
   * Cache rules:
   * - Entire File Cache  0 < file_size < entireFileCacheLimit
   * - Chunked Cache     entireFileCacheLimit  <= file_size < chunkedCacheLimit
   * - No Cache ( redirect to OneDrive Server )   others
   *
   * Difference between `Entire File Cache` and `Chunked Cache`
   *
   * `Entire File Cache` requires the entire file to be transferred to the Cloudflare server before
   *  the first byte sent to a client.
   *
   * `Chunked Cache` would stream the file content to the client while caching it.
   *  But there is no exact Content-Length in the response headers. ( Content-Length: chunked )
   *
   * `previewCache`: using CloudFlare cache to preview
   */
  cache: {
    enable: true,
    entireFileCacheLimit: 10000000, // 10MB
    chunkedCacheLimit: 100000000, // 100MB
    previewCache: false,
    paths: ['/🥟%20Some%20test%20files/Previews']
  },

  /**
   * Feature: Thumbnail
   * Show a thumbnail of image by ?thumbnail=small (small, medium, large)
   * More details: https://docs.microsoft.com/en-us/onedrive/developer/rest-api/api/driveitem_list_thumbnails?view=odsp-graph-online#size-options
   * Example: https://storage.spencerwoo.com/🥟%20Some%20test%20files/Previews/eb37c02438f.png?thumbnail=mediumSquare
   * You can embed this link (url encoded) directly inside Markdown or HTML.
   */
  thumbnail: true,

  /**
   * Small File Upload (<= 4MB)
   * POST https://<base_url>/<directory_path>/?upload=<filename>&key=<secret_key>
   * The <secret_key> is defined by you
   */
  upload: {
    enable: false,
    key: 'your_secret_key_here'
  },

  /**
   * Feature: Proxy Download
   * Use Cloudflare as a relay to speed up download. (Especially in Mainland China)
   * Example: https://storage.spencerwoo.com/🥟%20Some%20test%20files/Previews/eb37c02438f.png?raw&proxied
   * You can also embed this link (url encoded) directly inside Markdown or HTML.
   */
  proxyDownload: true
}

// IIFE to set apiEndpoint & baseResource
// eslint-disable-next-line no-unused-expressions
!(function({ accountType, driveType, hostName, sitePath }) {
  config.apiEndpoint = {
    graph: accountType ? 'https://microsoftgraph.chinacloudapi.cn/v1.0' : 'https://graph.microsoft.com/v1.0',
    auth: accountType
      ? 'https://login.chinacloudapi.cn/common/oauth2/v2.0'
      : 'https://login.microsoftonline.com/common/oauth2/v2.0'
  }
  config.baseResource = driveType ? `/sites/${hostName}:${sitePath}` : '/me/drive'
})(config.type)

export default config
