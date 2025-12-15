import React, { useState } from 'react';
import { useRequest } from 'ahooks';

// 模拟 API 请求函数
const fetchUserList = async ({ page = 1, pageSize = 10, keyword = '' }) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 模拟可能的错误
  if (Math.random() < 0.1) {
    throw new Error('网络请求失败');
  }
  
  // 模拟数据
  const allUsers = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: 20 + (i % 30),
  }));
  
  // 过滤和分页
  const filtered = keyword 
    ? allUsers.filter(u => u.name.includes(keyword))
    : allUsers;
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    list: filtered.slice(start, end),
    total: filtered.length,
    page,
    pageSize,
  };
};

// 模拟获取用户详情
const fetchUserDetail = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    id: userId,
    name: `用户${userId}`,
    email: `user${userId}@example.com`,
    age: 20 + (userId % 30),
    bio: '这是用户的详细介绍...',
    createdAt: new Date().toISOString(),
  };
};

function AhooksuseRequestDemoFunc() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  // 示例 1: 自动请求用户列表
  const {
    data: userListData,
    loading: userListLoading,
    error: userListError,
    refresh: refreshUserList,
    run: runUserList,
  } = useRequest(
    () => fetchUserList({ page, pageSize: 10, keyword }),
    {
      // 依赖项变化时自动重新请求
      refreshDeps: [page, keyword],
      // 防抖，避免频繁请求
      debounceWait: 300,
      // 成功回调
      onSuccess: (result) => {
        console.log('用户列表加载成功:', result);
      },
      // 错误回调
      onError: (error) => {
        console.error('加载失败:', error);
      },
    }
  );

  // 示例 2: 手动触发请求用户详情
  const {
    data: userDetail,
    loading: detailLoading,
    run: fetchDetail,
  } = useRequest(fetchUserDetail, {
    manual: true, // 手动触发
    onSuccess: (detail) => {
      console.log('用户详情:', detail);
    },
  });

  // 示例 3: 轮询请求（演示用）
  const {
    data: pollData,
    loading: pollLoading,
    run: startPoll,
    cancel: stopPoll,
  } = useRequest(
    () => fetchUserList({ page: 1, pageSize: 5 }),
    {
      manual: true,
      pollingInterval: 5000, // 每5秒轮询一次
      pollingWhenHidden: false, // 页面隐藏时停止轮询
    }
  );

  const handleViewDetail = (userId) => {
    setSelectedUserId(userId);
    fetchDetail(userId);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px' }}>ahooks useRequest 完整示例</h1>

      {/* 用户列表部分 */}
      <div style={{ marginBottom: '32px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h2>示例 1: 自动请求 + 依赖刷新 + 防抖</h2>
        
        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="搜索用户名..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d0d0d0',
              borderRadius: '4px',
              fontSize: '14px',
              width: '200px',
            }}
          />
          <button
            onClick={refreshUserList}
            style={{
              padding: '8px 16px',
              background: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            刷新列表
          </button>
          <span style={{ fontSize: '12px', color: '#666' }}>
            (输入会自动防抖请求)
          </span>
        </div>

        {userListLoading && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#1890ff' }}>
            加载中...
          </div>
        )}

        {userListError && (
          <div style={{ padding: '12px', background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: '4px', color: '#cf1322' }}>
            错误: {userListError.message}
          </div>
        )}

        {userListData && (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
              <thead>
                <tr style={{ background: '#fafafa', borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>姓名</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>邮箱</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>年龄</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {userListData.list.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px' }}>{user.id}</td>
                    <td style={{ padding: '12px' }}>{user.name}</td>
                    <td style={{ padding: '12px' }}>{user.email}</td>
                    <td style={{ padding: '12px' }}>{user.age}</td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => handleViewDetail(user.id)}
                        style={{
                          padding: '4px 12px',
                          background: '#52c41a',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                        }}
                      >
                        查看详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>共 {userListData.total} 条数据</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #d0d0d0',
                    borderRadius: '4px',
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                    background: page === 1 ? '#f5f5f5' : 'white',
                  }}
                >
                  上一页
                </button>
                <span style={{ padding: '6px 12px' }}>第 {page} 页</span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page * 10 >= userListData.total}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #d0d0d0',
                    borderRadius: '4px',
                    cursor: page * 10 >= userListData.total ? 'not-allowed' : 'pointer',
                    background: page * 10 >= userListData.total ? '#f5f5f5' : 'white',
                  }}
                >
                  下一页
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 用户详情部分 */}
      <div style={{ marginBottom: '32px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h2>示例 2: 手动触发请求</h2>
        
        {!selectedUserId && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
            请在上面的列表中点击"查看详情"按钮
          </div>
        )}

        {detailLoading && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#1890ff' }}>
            加载用户详情中...
          </div>
        )}

        {userDetail && (
          <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '4px' }}>
            <h3>用户详情 (ID: {userDetail.id})</h3>
            <div style={{ marginTop: '12px', lineHeight: '1.8' }}>
              <div><strong>姓名:</strong> {userDetail.name}</div>
              <div><strong>邮箱:</strong> {userDetail.email}</div>
              <div><strong>年龄:</strong> {userDetail.age}</div>
              <div><strong>简介:</strong> {userDetail.bio}</div>
              <div><strong>创建时间:</strong> {userDetail.createdAt}</div>
            </div>
          </div>
        )}
      </div>

      {/* 轮询示例 */}
      <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h2>示例 3: 轮询请求</h2>
        
        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
          <button
            onClick={startPoll}
            style={{
              padding: '8px 16px',
              background: '#52c41a',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            开始轮询 (每5秒)
          </button>
          <button
            onClick={stopPoll}
            style={{
              padding: '8px 16px',
              background: '#ff4d4f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            停止轮询
          </button>
        </div>

        {pollLoading && <div style={{ color: '#1890ff' }}>轮询加载中...</div>}
        
        {pollData && (
          <div style={{ padding: '12px', background: '#f0f9ff', borderRadius: '4px' }}>
            <div>轮询数据 (最新5条):</div>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              {pollData.list.map(user => (
                <li key={user.id}>{user.name} - {user.email}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 说明 */}
      <div style={{ marginTop: '32px', padding: '16px', background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '4px' }}>
        <h3 style={{ marginTop: 0 }}>useRequest 核心特性演示:</h3>
        <ul style={{ marginBottom: 0, lineHeight: '1.8' }}>
          <li><strong>自动请求:</strong> 示例1 在组件加载时自动发起请求</li>
          <li><strong>依赖刷新:</strong> page 和 keyword 变化时自动重新请求</li>
          <li><strong>防抖:</strong> 输入搜索关键词时，300ms 后才发起请求</li>
          <li><strong>手动触发:</strong> 示例2 需要手动调用 run 方法才会请求</li>
          <li><strong>轮询:</strong> 示例3 可以设置定时轮询获取最新数据</li>
          <li><strong>状态管理:</strong> loading, error, data 自动管理</li>
          <li><strong>生命周期:</strong> onSuccess, onError 等回调函数</li>
        </ul>
      </div>
    </div>
  );
}

export default AhooksuseRequestDemoFunc;