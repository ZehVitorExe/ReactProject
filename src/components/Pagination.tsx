import React from 'react';
import { Button } from './Button';

interface Props {
  page: number;
  onPageChange: (p: number) => void;
  hasMore: boolean;
}

export const Pagination: React.FC<Props> = ({ page, onPageChange, hasMore }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
      <Button onClick={() => onPageChange(Math.max(1, page - 1))} variant="outline" disabled={page === 1} style={{ minWidth: 90 }}>
        Anterior
      </Button>
      <div style={{ alignSelf: 'center' }}>Página {page}</div>
      <Button onClick={() => onPageChange(page + 1)} variant="outline" disabled={!hasMore} style={{ minWidth: 90 }}>
        Próximo
      </Button>
    </div>
  );
};

export default Pagination;
