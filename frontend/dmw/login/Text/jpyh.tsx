import {
    Text,
    StyleSheet,
    View,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    SafeAreaView,
} from "react-native";
import React, { Component, useEffect, useState, useContext } from "react";

const str = () => {
    return (
        <ScrollView style={{ padding: 20 }}>
            <View>
                <Text>利用規約

                    制定日期：2022年09月27日

                    本規約は、DMW上にて提供する一切のサービス（以下「本サービス」といいます）の全ての利用者（以下「利用者」といいます）とDMWとの関係を定めるものです。
                    利用者は、本規約の全条項をお読みいただき、ご同意いただいた場合にのみ、本サービスをご利用いただくことができます。本規約にご同意いただけない利用者は、本サービスをご利用できませんので、本サービスの利用を中止してください。
                    第１条．	適用範囲
                    1)	本利用規約（以下「本規約」といいます。）は、DMWアプリケーション（以下は「本アプリ」といいます。）により提供するダウンロード、インストール、登録等のサービスに利用につき、本サービスの利用者及び利用者になろうとする者が遵守すべき事項を定めるものです。
                    2)	DMWは、本サービスに関して本規約の下位規約、ガイドライン、ヘルプ等を定めることがあります。本規約の下位規約、ガイドライン、ヘルプ等は本規約の一部として利用者による本サービスの利用に適用されます。
                    3)	DMWは、本アプリの運営主体およびサービス提供者として、アプリの運営またはサービス提供主体を利用者に通知することなく、変更することができます。本規約の変更の効力が生じた後、利用者が本サービスを利用した場合には、本規約に同意したものとみなされます。
                    第２条．	サービス内容及び仕様
                    1)	利用者がコレクションを購入する価格は、実際の取引画面（お客様の側）に表示される価格で実行されます。DMWにて指定された方法（Wechatのほか、今後DMWが指定する支払方法も含む）でお支払ってください。法的な返金義務がある場合を除き、DMWは払い戻しを受けられません。
                    2)	利用者がコレクションを購入した後、DMWは利用者の学習、研究、鑑賞、コレクションのため展示サービスを提供します。ただし、利用者は上記以外の目的には使用してはいけません。
                    3)	ネットサービスが特殊性があるため、技術のアップグレード、サービス体系のアップグレード、経営戦略の調整、あるいは国家の重大な技術、法律法規、政策などの変化に合わせて、DMWは需要に応じて本アプリおよび本サービスの内容を更新または調整し、または本サービスを停止、終了することとなります。上記の内容にかんしては、いかなる責任を持つものでもありません。
                    第３条．	本アプリについて
                    1)	本規約に示される権利を行使または実施しない場合でも、DMWが当該権利を放棄するものではありません。
                    2)	利用者は本アプリの公式ウェブサイト、公式アプリ配信プラットフォーム、アプリ配信プラットフォームなどのDMWライセンスからダウンロードすることができます。
                    3)	DMWに許可されていない第三者から本アプリまた本アプリと同じ名のアプリを取得した場合、DMWはアプリの正常な使用を保証することはできないものとし、それにより生じた損失に対しては責任を負いません。
                    4)	DMWは使用端末、システムなどに応じて異なるバージョンを開発し、利用者は自身状況により、適切なバージョンをダウンロードしてください。
                    5)	利用者は本アプリを使用する必要がないあるいは新しいバージョンをアップされる場合、自分でアンインストールすることができます。
                    6)	利用者の使用体験を向上させ、サービスの内容を改善するために、DMWは新しいサービスを開発し、アプリの更新を提供します。
                    7)	利用者の体験の改善やサービスの安全性の向上などのために、本アプリを更新する、または本アプリの一部の機能やサービス内容を変更することとします。
                    8)	バージョンアップされた後、以前のバージョンが使用できないものとします。DMWは以前のバージョンに対して対サービスを提供し続けることを保証いたしません。最新バージョンをダウンロードしてください。
                    第４条．	個人情報
                    DMWは、本規約および「プライバシーポリシー」に基づき、利用者の個人情報を収集、使用、保存、共有します。
                    DMWは、利用者の個人情報をいかなる第三者にも転送または披露すとことは一切しません。ただし、以下の場合を除き：

                    1)	係る法律法規または司法機関、行政機関の要求
                    2)	合併、分立、買収または資産譲渡を完了するための移転。
                    3)	ご要望のサービスを提供するため
                    4)	「プライバシーポリシー」またはその他の関連規則に従って、第三者にも移転または披露できる場合。
                    5)	他のユーザーに関する個人情報等を収集または蓄積する行為により生じた損害について、何ら責任を負いません。
                    第５条．	禁止事項
                    利用者は、本アプリの利用にあたって、以下のことを行ってはなりません。

                    1)	利用者は、本アプリを構成する全てのプログラム・データ等について、本規約上明示的に定められている場合を除き、複製、翻案、第三者に対する開示、再使用権の設定、頒布、販売、譲渡、貸与、提供等を行うことはできません。
                    2)	コンテンツを複製、又は不特定若しくは多数の者が閲覧可能な状態にすること
                    3)	他のユーザーに関する個人情報等を収集または蓄積する行為
                    4)	当社、コンテンツホルダー、その他の第三者の権利を侵害するおそれのある方法で利用し、又は侵害を援助若しくは助長すること
                    5)	本サービスの円滑な運営を妨げること
                    6)	本規約等に違反すること
                    7)	その他、合理的根拠に基づき当社が合理的に不適切と判断する行為

                    第６条．	法律責任
                    利用者が法律法規、本規約、およびDMWのその他の規約、規則に違反した場合、DMWは当該利用者について、本アプリの利用者資格を停止するなどの処分をすることができます。処分措置は以下の通りです：

                    1)	利用者に警告すること。
                    2)	法律に違反する情報を削除すること。
                    3)	本アプリの利用資格を全部・一部制限すること。
                    4)	本アプリの利用資格を停止すること。
                    5)	法に基づいて関系行政管理机関に移管して行政処罰を受ける、または法に基づいて関係機関に通報することとする。

                    第７条．免責条件
                    1)	天災地変、戦争、テロ、暴動、労働争議、法令・規則の制定改廃、政府機関の介入又は命令、伝染病、停電、など不可抗力により、サービスの全部又は一部を提供できない場合、ユーザーに生じた損害について、当社は一切責任を負いません。
                    2)	当社は、利用者に対し、適宜情報提供やアドバイスを行うことがあるが、それにより責任を負うものではない。
                    3)	利用者が本規約等に違反したことによって生じた損害については、当社は一切責任を負わない。
                    4)	通信回線やコンピュータ等の障害・システムメンテナンス等による生じた損害については、当社は一切責任を負いません。
                    5)	前各項のほか、DMWが予測する、また控えることができない事情により生じた損害につて、DMWは一切責任を負いません。

                    第８条．その他
                    1)	DMWが本規約を改定する場合、DMWはウェブサイトへの掲載その他当社所定の方法により利用者に告知するものとします。ユーザーが本アプリを利用続けた場合、利用者は、本規約に同意したものとみなします。
                    2)	本規約のすべての条件のタイトルは読みやすいためのもので、それ自体が実際の意味を持っていないので、本規約の意味解釈の根拠にはならないことをご承知おきください。
                    3)	本規約の条項はいかなる理由で一部が無効であっても、他の条項は依然として有効であり、お互いに対して拘束力があるものとします。


                </Text>


            </View>
        </ScrollView>
    )

}


export default str