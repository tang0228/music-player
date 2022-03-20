import React from 'react';
import { Empty } from '@douyinfe/semi-ui';
import { IllustrationNotFound, IllustrationNotFoundDark } from '@douyinfe/semi-illustrations';

export default function index() {
    return (
        <div style={{
            height: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Empty
                image={<IllustrationNotFound style={{ width: 150, height: 150 }} />}
                darkModeImage={<IllustrationNotFoundDark style={{ width: 150, height: 150 }} />}
            />
        </div>

    )
}
