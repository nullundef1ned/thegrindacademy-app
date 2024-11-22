import useURL from '@/hooks/useURL';
import React, { useState } from 'react'
import { Input } from '../ui/input';

type TableSearchProps = {
  searchable: boolean;
  fetching: boolean | undefined;
  searchValue: string;
}

export default function TableSearch({ searchable, fetching, searchValue }: TableSearchProps) {
  const { updateParams } = useURL();

  const [search, setSearch] = useState<string>('' || searchValue);

  const handleSearch = (value: string) => {
    updateParams({ key: 'search', value });
  }

  const isFetching = fetching && search.length > 1;

  return (
    <div className="flex items-center space-x-4 w-full max-w-80">
      {searchable && (
        <Input
          icon="jam:search"
          type="search"
          placeholder="Search"
          value={search}
          className="transition-all"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') handleSearch(search)
          }}
        />
      )}
    </div>
  )
}
