namespace Eu.InCloud.Medical.Management.Dtos
{
    public class PaginationParameters
    {
        const int maxLimit = 50;
        
        public int Page { get; set; } = 0;
        private int _limit = 10;
        public int Limit
        {
            get
            {
                return _limit;
            }
            set
            {
                _limit = (value > maxLimit) ? maxLimit : value;
            }
        }
    }
}