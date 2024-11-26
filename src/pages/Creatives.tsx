import { Empty, Table } from 'antd';
import { collection } from 'firebase/firestore';
import { useCollectionQuery } from '../hooks/useCollectionQuery';
import { dynamicFirebaseColumn } from '../utils/dynamicFirebaseColumn';

export const Creatives: React.FC = () => {

  const locale = {
    emptyText: <Empty />,
  };

  return null;
};
