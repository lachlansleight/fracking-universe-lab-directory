export const applyColors = (text: string): JSX.Element => {
    const pieces = text.split("^reset;");
    const output: JSX.Element[] = [];
    pieces.forEach((piece, index) => {
        let key = text + index;
        const subPieces = piece.split("^");
        if (subPieces.length === 1) {
            output.push(<span key={key}>{piece}</span>);
            return;
        }

        subPieces.forEach((subPiece, subIndex) => {
            const subKey = key + "_" + subIndex;
            const endIndex = subPiece.indexOf(";");
            const color = subPiece.substr(0, endIndex);
            output.push(
                <span key={subKey} style={{ color: color }}>
                    {subPiece.substr(endIndex + 1)}
                </span>
            );
        });
    });
    return <>{output}</>;
};
