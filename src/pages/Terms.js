import React from 'react'
import NavbarContainer from '../components/NavbarContainer/NavbarContainer'
import Footer from '../components/Footer/Footer'
import { Container } from 'react-bootstrap'

function Terms() {
  return (
    <div>
        <NavbarContainer/>
        <Container>
            <div className='mt-5'>
                <p className='fw-bold text-center'>لأن مهمتنا هي الوصول بك للحياة التي تستحق.</p>
                <p className='text-center'>
                    فعندما يقوم المرء بالبحث عن عقار ملائم، فإنه لا يسعى للحصول على منزل أفضل ليعيش فيه فحسب، وإنما يتطلع نحو مستقبل أفضل.

                </p>
                <p className='text-center'>
                    خلال النسخة الثانية من حدث PF Connect الذي أقيم في دبي، كشفت بروبرتي فايندر عن أولى أوراقها البيضاء التي تركز على الحياة المجتمعية. وشهد الحدث أيضاً إطلاق أكاديمية PF Academy، وهي منصة تعليمية رقمية في مجال العقارات، وقد تم اعتمادها من قبل دائرة الأراضي والأملاك في دبي.

                </p>
                                <p className='text-center'>
                                    انتقل مايكل لحياني من العاصمة السويسرية فيينا ليستقر في دبي، حيث كان يخطط لإصدار أول مجلة مطبوعة ومتخصصة بالعقارات في دولة الإمارات. وبذلك تم إطلاق ’الباب وورلد‘، المجلة العقارية المطبوعة في البلاد. وبهدف توفير التوجيه والإرشاد للوكلاء العقاريين، يتم توزيع 70 ألف نسخة من مجلة ’الباب وورلد‘ مجاناً كل أسبوعين.


</p>
            </div>
        </Container>
        <Footer/>
    </div>
      )
}

export default Terms