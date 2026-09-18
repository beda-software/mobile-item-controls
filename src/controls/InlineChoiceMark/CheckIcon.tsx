import React from 'react';

import Svg, { Path } from 'react-native-svg';

const SIZE = 16;
const CHECK_PATH =
    'M12.6873 4.07705C12.8885 4.07705 13.0075 4.31114 12.8787 4.47158L12.8777 4.47061L7.15606 ' +
    '11.7235H7.15508C6.94416 11.9884 6.54121 11.9894 6.33086 11.7235L3.1209 7.65713C2.99522 ' +
    '7.49773 3.1088 7.26274 3.31231 7.2626H4.13165L4.24883 7.27627C4.28734 7.28513 4.32537 ' +
    '7.29795 4.36114 7.31533C4.43232 7.34999 4.49476 7.40059 4.54376 7.46279L6.742 10.2489L11.4568 ' +
    '4.27725C11.5559 4.15085 11.708 4.07717 11.868 4.07705H12.6873Z';

export function CheckIcon({ color }: { color: string }) {
    return (
        <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
            <Path
                d={CHECK_PATH}
                fill={color}
                stroke={color}
                strokeWidth={0.3}
            />
        </Svg>
    );
}
