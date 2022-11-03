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
        <ScrollView style={{padding:20}}>
        <View>
            <Text>隐私政策

                上次更新日期：2022年 08月18日

                导言：DMW官方平台致力于保护您的隐私。我们制定本隐私政策是为了向您描述我们收集、使用和共享的个人数据（定义见下文）的做法，这些数据与DMW网站、移动应用程序以及我们服务中提供的或与我们服务相关的其他软件有关，如我们的服务条款（统称为“服务”）所述。本隐私政策中的“NFT”是指在区块链（如以太坊区块链）上实施的不可替代令牌或类似数字项目，其使用智能合约链接到某些内容或数据或以其他方式与之关联。

                您的角色和责任：在使用本软件及服务前，请透彻理解本政策，在确认充分理解并同意后再开始使用。对于本政策内容有任何疑问、意见或建议，您可通过DMW提供的各种联系方式与我们联系。

                您的权利和选择：
                (1)您有权了解本软件个人信息收集和存储操作。
                (2)您有权了解您的个人信息将被谁以何种方式使用。
                (3)您有权了解我们可能会向谁共享或披露您的个人信息。
                (4)您有权在任何时候询问我们是否处理您的个人信息、请求访问、移除或删除或移转（转移）您的个人信息，并且要求我们对您不准确的个人信息进行纠正或修改。

                １．我们收集的数据类型。
                “个人数据”是指允许某人单独识别您的数据，包括您的姓名、电子邮件地址以及与上述任何信息相关或链接的其他非公开信息。“匿名数据”是指与您的个人无关的数据，包括聚合数据和取消标识的数据，匿名数据本身不允许识别个人。

                我们收集个人数据和匿名数据，如下所述：

                a、您提供给我们的信息。
                (1)  当您使用我们的服务、更新您的帐户配置文件或与我们联系时，我们可能会收集您的个人数据，例如电子邮件地址、名字和姓氏、用户名以及您提供的其他信息。我们还收集您的区块链地址，当您使用我们的服务时，该地址可能会与个人数据关联。
                (2)  我们的服务允许您存储首选项，如内容的显示方式、通知设置和收藏夹。我们可能会将这些选择与您的ID、浏览器或移动设备相关联。
                (3)  如果您向我们提供反馈，我们将收集您的姓名和联系信息，以及消息中包含的任何其他内容。
                (4)  您可以向我们自愿提供信息，也可以在我们声明中其他服务点收集你的个人数据。

                b、通过技术收集的信息。
                当您浏览我们的服务并与之互动时，我们可能会使用自动数据收集技术来收集有关您的设备、浏览动作和模式的某些信息，包括：
                (1)  我们的服务器收集的信息。为了提供我们的服务并使其对您更有用，我们（或第三方服务提供商）从您那里收集信息，包括但不限于您的浏览器类型、操作系统、互联网协议（“IP”）地址、移动设备ID、区块链地址、钱包类型和日期/时间戳。
                (2)  日志文件。正如大多数网站和应用程序一样，我们会自动收集某些信息并将其存储在日志文件中。这些信息包括IP地址、浏览器类型、互联网服务提供商（“ISP”）、引用/退出页面、操作系统、日期/时间戳和点击流数据。我们使用这些信息来分析趋势、管理服务、跟踪用户在服务中的移动，并更好地根据用户的需求定制我们的服务。
                (3)  Cookies。像许多在线服务一样，我们使用cookies收集信息。我们可以使用会话Cookie（在您关闭web浏览器后过期）和持久Cookie（在您删除它们之前一直保留在您的计算机上）来分析用户如何与我们的服务交互，改进我们的产品质量，并为用户提供更个性化的体验。
                (4)  Pixel Tag。我们使用“Pixel Tags”（也称为清晰GIF、网络信标或网络bug）。“Pixel Tags”允许我们分析用户如何找到我们的服务，使服务对您更有用，并定制您与我们的体验，以满足您的特定兴趣和需求。
                (5)  分析服务。除了我们提供的跟踪技术，如Cookie和Pixel Tag，其他公司可能会在您访问我们的服务时设置自己的Cookie或类似工具。这包括我们参与的第三方分析服务（“分析服务”），以帮助分析用户如何使用该服务。Cookie或其他技术生成的关于您使用我们服务的信息（“分析信息”）被传输到分析服务。分析服务使用分析信息来编译关于用户活动的报告，我们可以单独或汇总收到这些报告。我们使用从分析服务中获得的信息来改进我们的服务。如果法律要求，或者第三方代表其处理分析信息，分析服务也可以将信息传输给第三方。每个分析服务使用和共享分析信息的能力受到此类分析服务的使用条款和隐私政策的限制。

                c、 从第三方公司收集的信息。
                我们可能会将其提供的产品和服务结合我们的服务使用，其产品和服务可能与我们的服务链接的公司收到有关您的个人和/或匿名数据。例如，第三方钱包提供商向我们提供您的区块链地址以及您选择与这些钱包提供商共享的某些其他信息。我们可能会将其添加到我们已经通过我们的服务从您那里收集的或关于您的数据中。

                d、从区块链观察到的公共信息。
                我们从区块链上公开可见和可访问的活动中收集数据，包括区块链地址和有关非金融交易的购买、销售或转让的信息，可能与您提供给我们的其他数据相关联。


                2.使用您的个人数据
                a、 我们严格遵守法律法规的规定以及与用户的约定，按照本隐私保护指引所述使用收集的信息，以向您提供更为优质的服务。
                具体而言，我们使用您的个人数据在以下情况：
                (1)	促进创建并保护您的账户；
                (2)	确定您是我们系统中的用户；
                (3)	为您提供我们的服务，包括帮助您使用我们的工具查看、探索和创建NFT、和在公共区块链上购买、出售或转让NFT；
                (4)	当您与我们的服务互动时，我们将分析您与我们的互动提升服务管理和体验质量；
                (5)	提供客服支持并回应您的请求和询问；
                (6)	调查并解决可能违反我们服务条款的行为；
                (7)	预防和解决欺诈问题，检测违反我们的条款或政策和/或其他有害或非法活动；
                (8)	向您发送欢迎电子邮件，以验证您创建帐户时提供的电子邮件地址的所有权；
                (9)	向您发送与服务操作相关的通知，包括您的NFT上的优惠通知；
                (10)	上述使用目的附带的目的

                b、 我们可以从个人数据中创建匿名数据记录。我们使用这些匿名数据来分析请求和使用模式，以便改进服务并提供服务质量。我们保留出于任何目的使用匿名数据的权利，并向第三方披露匿名数据的权利。

                3.披露您的个人数据。
                我们将按照下文以及本隐私政策和其他部分的规定披露您的个人数据：
                a、第三方服务提供商。我们可能会与第三方服务提供商共享您的个人数据，以提供技术基础设施服务；进行质量保证测试；分析我们的服务是如何使用的；预防、检测和应对未经授权的活动；提供技术和客户支持；向我们和服务提供其他支持。
                b、 附属公司。我们可能与我们共同控制的任何子公司、合资企业或其他公司（“附属公司”）共享您的部分或全部个人数据，在这种情况下，我们将要求我们的附属公司遵守本隐私政策。
                c、 公司重组。我们可能会在涉及出售、转让、剥离或披露我们全部或部分业务或资产的任何合并、融资、收购或解散交易或程序的谈判过程中共享您的部分或全部个人数据。如果另一家公司收购了我们的公司、业务或资产，该公司将拥有我们收集的个人数据，并将承担本隐私政策中所述的与您的个人数据有关的权利和义务。
                d、 合法权利。无论您对您的个人数据做出何种选择，如果DMW真诚地认为有必要披露个人数据，则DMW可以披露这些数据：与任何法律调查有关； 遵守相关法律或回应在DMW上送达的传票、认股权证或其他法律程序； 保护或捍卫DMW或服务用户的权利或财产；调查或协助防止任何违反或潜在违反法律、本隐私政策或我们的服务条款的行为。
                e、 其他披露。在征得你的同意的前提下，我们还可能披露您的个人数据，以实现您提供数据的目的。

                4.第三方网站。
                我们的服务可能包含指向第三方网站的链接。当您单击指向任何其他网站或位置的链接时，您将离开我们的服务并跳转到另一个网站，该网站可能会从您那里收集个人数据。我们对这些第三方网站和其内容没有控制权，也不进行审查，也不对其负责。请注意，本隐私政策的条款不适用于这些第三方网站和其内容，也不适用于您在单击指向此类第三方网站的链接后收集的任何个人数据。

                5.第三方钱包。
                要使用我们的服务，您必须使用第三方钱包，该钱包允许您在公共区块链上进行交易。您与任何第三方钱包提供商的互动受该第三方适用的服务条款和隐私政策管控。

                6.数据访问和控制。
                您可以通过设置页面查看、访问、编辑或删除服务某些方面的个人数据。您还可能拥有某些其他权利：
                a、 如果您是欧洲经济区或英国的用户，您根据各自的欧洲和英国通用数据保护条例（“GDPR”）享有某些权利。这些权利包括：（i）请求访问和获取您的个人数据副本的权利；（ii）要求改正或删除；（iii）反对或限制处理您的个人数据；以及（iv）要求个人数据的可移植性。此外，如果我们在您同意的情况下收集和处理了您的个人数据，您有权随时撤回您的同意。
                b、 如果您是加利福尼亚州居民，您根据《加利福尼亚消费者隐私法》（“CCPA”）享有某些权利。这些权利包括：（i）请求访问我们收集的和/或与第三方共享的关于您的个人信息的详细信息和副本；（ii）要求删除我们收集的关于您的个人信息；以及（iii）选择不出售您的个人信息的权利。根据CCPA的定义，我们不会“出售”您的“个人信息”。
                c、 如果您希望行使GDPR、CCPA或其他适用数据保护或隐私法下的权利，请使用此处的“提交请求”链接或以下第13条中提供的地址与我们联系，说明您的请求，并参考适用法律。我们可能会要求您验证您的身份，或询问有关您请求的更多信息。我们将根据适用法律考虑并采取行动。我们不会因您行使这些权利而歧视您。
                d、 尽管有上述规定，我们不能编辑或删除存储在区块链（例如以太坊区块链）上的任何信息，因为我们对任何区块链都没有控制权。区块链上存储的信息包括您的区块链地址和在该地址持有的非金融交易相关的购买、销售和转让。

                7.数据保留。
                只要您继续使用本服务，在我们这里有账户，或者为了实现本隐私政策中概述的目的，我们可能会保留您的个人数据。即使在您停用您的账户和/或停止使用服务后，我们也可能继续保留您的个人数据，前提是此类保留对于遵守我们的法律义务、解决纠纷、执行我们的条款和其他协议、保护我们的合法利益是合理必要的。如果您的个人数据不再需要用于这些目的，我们将删除它。

                8.数据保护。
                我们努力为用户的信息安全提供保障，以防止信息的泄露、丢失、不当使用、未经授权访问和披露等。我们使用多方位的安全保护措施，以确保用户的个人信息保护处于合理的安全水平，包括技术保护手段、管理制度控制、安全体系保障等诸多方面。
                您对自身数字钱包的安全负责，我们将敦促您采取措施确保其安全。如果您发现与钱包相关的问题，请联系您的钱包提供商。

                9.未成年人。
                我们无意收集13岁以下访客的个人数据。我们的服务条款要求所有用户至少18岁。年满13岁但未满18岁的未成年人可以使用父母或监护人的DMW账户，但必须有账户持有人的参与。如果13岁以下儿童向DMW提交个人数据，并且我们得知该个人数据是13岁以下儿童的信息，我们将尝试尽快删除该信息。如果您认为我们可能有13岁以下儿童的任何个人数据，请使用此处的“提交请求”链接或以下第13条所示的地址与我们联系。
                </Text>
               
                     
                 </View>
             </ScrollView>
    )

}


export default str