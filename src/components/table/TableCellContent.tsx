import Status from './Status';
import useCurrency from '@/hooks/useCurrency';
import Image from 'next/image';
import helperUtil from '@/utils/helper.util';
import Avatar from '../Avatar';
import { StatusType } from '@/app/_module/app.type';
import { TableHeader } from './table.interface';
import { TableHeaderTypeEnum } from './table.enum';
import { Progress } from '../ui/progress';
import { TData } from '@/app/_module/app.interface';
import FeaturedToggle from './FeaturedToggle';
import { ICourseDetail } from '@/app/(student)/_module/_interfaces/course.interface';
import PaymentStatus from './PaymentStatus';
import { IBillingHistory } from '@/app/(student)/_module/student.interface';

type TableCellContentProps<T> = {
  row: TData<T>;
  header: TableHeader<TData<T>>;
}

export default function TableCellContent<T>({ row, header }: TableCellContentProps<T>) {
  const { formatCurrency } = useCurrency();

  const keys = (header.key as string).split('+');
  // @ts-expect-error this dynamically accesses the keys
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
    case TableHeaderTypeEnum.PAYMENT_STATUS:
      return <PaymentStatus status={value as StatusType} paymentURL={(row as unknown as IBillingHistory).paymentLink} />
    case TableHeaderTypeEnum.PUBLISHED:
      const published = value === 'true' ? 'published' : 'draft';
      return <Status status={published as StatusType} />
    case TableHeaderTypeEnum.BOOLEAN:
      const boolean = value === 'true' ? 'yes' : 'no';
      return <Status status={boolean as StatusType} />
    case TableHeaderTypeEnum.FEATURED:
      const isFeatured = value === 'true';
      const isPublished = (row as unknown as ICourseDetail).status === 'published';
      return <FeaturedToggle courseId={row.id} published={isPublished} isFeatured={isFeatured} />
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
      const name = (values[0] || header.fallback) as unknown as string;
      const image = (values[1] as unknown as string) || '';

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
