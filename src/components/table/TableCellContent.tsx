import Status from './Status';
import useCurrency from '@/hooks/useCurrency';
import Image from 'next/image';
import helperUtil from '@/utils/helper.util';
import Avatar from '../Avatar';
import { StatusType } from '@/app/_module/app.type';
import { TableHeader } from './table.interface';
import { TableHeaderTypeEnum } from './table.enum';
import { Progress } from '../ui/progress';

type TableCellContentProps = {
  row: any;
  header: TableHeader<any>;
}

export default function TableCellContent({ row, header }: TableCellContentProps) {
  const { formatCurrency } = useCurrency();

  const keys = (header.key as string).split('+');
  const values = keys.map((key) => key.split('.').reduce((acc, key) => acc?.[key], row));
  const temp = values.length > 1 ? values.join(' ') : values.toString();
  const value = temp || header.fallback || 'N/A';

  switch (header.type) {
    case TableHeaderTypeEnum.IMAGE:
      return <Image width={48} height={48} alt={header.value} src={value} className="rounded-xl object-cover aspect-square" />
    case TableHeaderTypeEnum.EMAIL:
      return <span>{value.toLocaleLowerCase()}</span>
    case TableHeaderTypeEnum.STATUS:
      return <Status status={value as StatusType} />
    case TableHeaderTypeEnum.PROGRESS:
      return (
        <div className="flex items-center gap-2">
          <Progress value={parseInt(value)} />
          <p className="text-sm font-medium">{value}%</p>
        </div>
      )
    case TableHeaderTypeEnum.DATE_TIME:
      const dateTimeDate = helperUtil.formatDate(value);
      const dateTimeTime = helperUtil.formatTime(value);
      return <span>{`${dateTimeDate} • ${dateTimeTime}`}</span>;
    case TableHeaderTypeEnum.DATE:
      const date = helperUtil.formatDate(value);
      return <span>{date}</span>;
    case TableHeaderTypeEnum.TIME:
      const time = helperUtil.formatTime(value);
      return <span>{time}</span>
    case TableHeaderTypeEnum.CURRENCY:
      return <span>{formatCurrency(value)}</span>
    case TableHeaderTypeEnum.SLUGGED:
      return <span className="capitalize">{value.replaceAll('-', ' ')}</span>
    case TableHeaderTypeEnum.TEXT:
      return <span className="capitalize">{value}</span>
    case TableHeaderTypeEnum.LONG_TEXT:
      return <span className="w-40 inline-block truncate">{value}</span>
    case TableHeaderTypeEnum.AVATAR:
      const name = values[0] || header.fallback;
      const image = values[1];

      return (
        <div className="flex items-center space-x-2">
          <Avatar src={image} size={32} alt={name} />
          <p className="body-2 medium whitespace-nowrap">{name}</p>
        </div>
      )
    default:
      return <span>{value}</span>
  }
}
