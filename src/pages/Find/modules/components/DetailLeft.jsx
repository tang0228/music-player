import React from "react";
import style from "./detailLeft.module.less";
import { Link} from "react-router-dom";
import {Tag, Button, Space} from "@douyinfe/semi-ui";
import {IconPlayCircle, IconPlus, IconFolder, IconForward, IconDownload, IconComment} from "@douyinfe/semi-icons";
import utils from "../../../../utils";
function DetailLeft(props) {
  const detail = props.detail;
  return (
    <>
      {detail ? (
        <div className={style["detail-left"]}>
          <div className="top-content">
            <div className="img">
                <img src={detail.coverImgUrl} alt="" />
            </div>
            <div className="list-content">
                <div className="list-name">{detail.name}</div>
                <div className="create-desc">
                    <img src={detail.creator.avatarUrl} alt="" />
                    <Link className="nick-name" to="">{detail.creator.nickname}</Link>
                    <img className="icon" src={detail.creator.avatarDetail.identityIconUrl} alt="" />
                    <div className="create-time">{utils.formatDate(detail.createTime)}创建</div>
                </div>
                <div className="operates">
                    <Space>
                        <Button icon={<IconPlayCircle />}>播放</Button>
                        <Button icon={<IconPlus />}>({parseInt(detail.subscribedCount / 10000)})</Button>
                        <Button icon={<IconForward />}>({detail.shareCount})</Button>
                        <Button icon={<IconDownload />}>下载</Button>
                        <Button icon={<IconComment />}>({detail.commentCount})</Button>
                    </Space>
                </div>
                <div className="tags">
                    标签：{detail.tags.map((t, i) => <Tag key={i}>{t}</Tag>)}
                </div>
                <div className="desc">
                    介绍：{detail.description}
                </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DetailLeft;
