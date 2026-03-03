import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <div className='flex items-center gap-2'>
           
           <img src="/images/shop-logo.png" alt="ShopMyDayApp Logo" className="w-[60px] rounded-md object-contain" />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-lg">
                    ShopMyDay
                </span>
            </div>
        </div>
    );
}
