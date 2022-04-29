import ins from "./request";

// 搜索建议
export async function searchSuggest({ keywords }) {
    const res = await ins.get("/search/suggest", {
        params: {
            keywords
        }
    });
    return res;
}