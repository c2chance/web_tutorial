// @ts-nocheck

import { useRequest } from 'ahooks';

function UserProfile() {
  const { data, loading, error, run } = useRequest(fetchUserData, {
    manual: true, // 手动触发
    onSuccess: (result) => {
      message.success('加载成功');
    }
  });

  return (
    <div>
      {loading ? <Spin /> : <div>{data?.name}</div>}
      <Button onClick={run}>刷新</Button>
    </div>
  );
}
export default UserProfile;