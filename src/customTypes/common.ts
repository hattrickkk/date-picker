import { WithHolidaysProps } from '@utils/hocs/withHolidays'
import { WithRestrictionsProps } from '@utils/hocs/withRestrictions'
import { WithWeekStartsProps } from '@utils/hocs/withWeakStarts'
import { WithWeekendsProps } from '@utils/hocs/withWeekends'

export type Common = WithRestrictionsProps & WithHolidaysProps & WithWeekStartsProps & WithWeekendsProps
