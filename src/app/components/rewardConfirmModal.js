import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

const activeDayList = [0, 1, 2, 3, 5, 7, 15, 30, 45, 60];

const RewardConfirmModal = ({
  taskName,
  setTaskName,
  open,
  onClose,
  loading,
  actionType,
  handleConfirm,
  setActionDay,
}) => {
  return (
    <Dialog
      size="xs"
      open={open}
      handler={onClose}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            详细设置
          </Typography>
          <Typography className="-mb-2" variant="h6">
            任务名称
          </Typography>
          <Input
            label="任务名称"
            size="lg"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          {actionType !== 0 && (
            <>
              <Typography className="-mb-2" variant="h6">
                活跃天数
              </Typography>
              <Select label="活跃天数" onChange={(e) => setActionDay(e)}>
                {activeDayList.map((day, index) => (
                  <Option key={index} value={day}>
                    {day} 天
                  </Option>
                ))}
              </Select>
            </>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            loading={loading}
            disabled={!taskName}
            onClick={handleConfirm}
            fullWidth
            className="flex justify-center items-center"
          >
            确认
          </Button>
          <Typography variant="small" className="mt-4 flex justify-center">
            积分:{" "}
            {process.env.NEXT_PUBLIC_PHONE_ACTIVE_DISCOUNT_SELL_PRICE * 20}
            (空号), {process.env.NEXT_PUBLIC_TG_ACTIVE_DISCOUNT_SELL_PRICE * 20}
            (TG), {process.env.NEXT_PUBLIC_WS_ACTIVE_DISCOUNT_SELL_PRICE * 20}
            (WS)
          </Typography>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default RewardConfirmModal;
