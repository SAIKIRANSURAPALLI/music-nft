import axios from "axios";

export const fetchNFTs = async () => {
  try {
    // Replace with your actual CID
    const cid = "bafybeigtrggfkbxuuetitnmjg7up5mzfbfhxivphstea7amcpug357ilmi";
    const url = `https://dweb.link/ipfs/${cid}`;
    const res = await axios.get(url, { responseType: "arraybuffer" });

    if (res.status !== 200) {
      throw new Error(`Failed to fetch NFTs with CID: ${cid}`);
    }

    // If the data is in a format like JSON or text
    const files = JSON.parse(Buffer.from(res.data).toString("utf-8"));

    // Map through files if they are in an array
    const nftData = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(
        new Blob([file.content], { type: file.mimeType })
      ),
    }));

    return nftData;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
};
