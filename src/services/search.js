import ins from "./request";

// 搜索
export async function search({ keywords = "", type = 1, limit = 20, offset = 0 }) {
    const res = await ins.get("/search", {
        params: {
            keywords,
            type,
            limit,
            offset
        }
    });
    return res;
};

// 搜索建议
export async function searchSuggest({ keywords }) {
    const res = await ins.get("/search/suggest", {
        params: {
            keywords
        }
    });
    return res;
}