import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import useURL from "@/hooks/useURL";

export default function SearchInput() {
  const { searchParams, updateParams } = useURL();
  const search = searchParams.get('search') || '';

  const [searchValue, setSearchValue] = useState<string>(search || '');

  const handleSearch = () => {
    updateParams({ key: 'search', value: searchValue });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      updateParams({ key: 'search', value: '' });
    }
  }

  return (
    <div className="flex items-end gap-3 w-full">
      <Input
        icon="ri:search-line"
        type="search"
        className="w-full"
        value={searchValue}
        placeholder="Search course"
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <Button size='sm' variant='secondary' className="" onClick={handleSearch}>
        Search
      </Button>
    </div>
  )
}
