import Button from "../atoms/Button";
import DatePicker from "../atoms/DatePicker";
import Label from "../atoms/Label";
import Typography from "../atoms/Typography";

const Filter = () => {
  return (
    <div className="w-full max-w-[450px] md:w-[450px] border border-secondary-30 rounded-lg p-4 md:p-5 bg-white">
      <Typography size="sm" weight="semibold" className="text-secondary-100">
        Date Range
      </Typography>
      <div className="mt-3">
        {/* Date Pickers - Stack on mobile, side by side on tablet+ */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Label htmlFor="fromDate">From</Label>
            <DatePicker id="fromDate" placeholder="31-12-2025" />
          </div>
          <div className="flex-1">
            <Label htmlFor="toDate">To</Label>
            <DatePicker id="toDate" placeholder="31-12-2025" />
          </div>
        </div>

        {/* Quick Filter Buttons - Stack on mobile, wrap on tablet */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <Button
            variant="outline"
            className="text-secondary-50 py-2 px-2 w-full sm:w-auto"
          >
            Today
          </Button>
          <Button
            variant="outline"
            className="text-secondary-50 py-2 px-2 w-full sm:w-auto"
          >
            This Week
          </Button>
          <Button
            variant="outline"
            className="text-secondary-50 py-2 px-2 w-full sm:w-auto"
          >
            This Month
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-secondary-30 mt-6">
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:justify-end">
            <Button
              variant="secondary"
              className="w-full sm:w-fit py-3 order-2 sm:order-1"
            >
              Reset All
            </Button>
            <Button
              variant="primary"
              className="w-full sm:w-fit py-3 order-1 sm:order-2"
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
