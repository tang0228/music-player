import ins from "./request";

/**
 * 新版获取评论列表
 * 资源 id, 如歌曲 id,mv id
 * type: 数字  0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
 * pageNo:分页参数,第 N 页,默认为 1
 * pageSize:分页参数,每页多少条数据,默认 20
 * sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
 * cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
 */
export async function getCommentList({id, type, pageNo = 1, pageSize = 20}) {
    const res = await ins.get("/comment/new", {
        params: {
            id,
            type, 
            pageNo, 
            pageSize
        }
    });
    return res;
};

/**
 * 发送（回复）评论
 */
export async function comment({t, type, id, content, commentId}) {
    const res = await ins.get("/comment", {
        params: {
            t, type, id, content, commentId
        }
    });
    return res;
}