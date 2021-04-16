import { useState } from 'react';

export const useBob = () => {
    const [bob, setBob] = useState<any>(+true);  /// 오류명 : Warning: Received "true" for a non-boolean attribute
    const PBob = () => {                         /// 공식문서에 ${props => props.$bob} 이런식으로 $를 같이쓰면 해결된다고 했지만 
        if (bob === +true) {                     /// FontAwesome 프롭 타입불분명으로 안됨... 다른 해결책으로 boolean 앞에 + 를 넣으면 오류가 사라진다고 해서
            setBob(+false);                      /// 어쩔수 없이 setBob을 if문으로 핸들링.
        } else {                                 /// 공식 사이트 : https://styled-components.com/docs/faqs#why-am-i-getting-html-attribute-warnings
            setBob(+true);
        };
    }
    return { bob, PBob };
}