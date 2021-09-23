const RawIcon = ({ url, className }: { url: string; className?: string }): JSX.Element => {
    return (
        <div className={`relative ${className || ""}`}>
            <img src={url} className={`w-full h-full rendering-pixelated object-contain`} />
        </div>
    );
};

export default RawIcon;
