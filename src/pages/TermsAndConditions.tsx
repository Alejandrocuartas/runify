import React, { FC } from 'react';
import { ResponsiveContainer } from '../components/Layout';

const TermsAndConditions: FC = () => {
    return (
        <ResponsiveContainer className="py-8 md:py-12">
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Términos y Condiciones de Uso – Runity
                </h1>
                
                <div className="prose prose-lg max-w-none">
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                            <strong>Fecha de última actualización:</strong> 24 de mayo de 2025
                        </p>
                    </div>

                    <section className="mb-8">
                        <p className="text-gray-700 mb-6">
                            Bienvenido a Runity. El presente documento establece los Términos y Condiciones (en adelante, "TyC") que rigen el uso de la plataforma web y/o aplicación móvil Runity (en adelante, la "Plataforma"), propiedad de Runity S.A.S., una sociedad constituida en Colombia.
                        </p>
                        <p className="text-gray-700 mb-6">
                            Le rogamos leer este documento con atención. Al acceder, navegar, registrarse o utilizar los servicios de la Plataforma, usted manifiesta su aceptación plena e incondicional de todos los puntos descritos en estos TyC.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Definiciones Claras</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li><strong>Plataforma:</strong> Se refiere al sitio web www.runity.com y/o su correspondiente aplicación móvil, a través de los cuales se prestan los Servicios.</li>
                            <li><strong>Usuario:</strong> Toda persona natural que utiliza la Plataforma para consultar información, registrarse y realizar el pago de la inscripción a un Evento.</li>
                            <li><strong>Organizador:</strong> La persona natural o jurídica, externa e independiente de la Plataforma, que organiza, produce y es responsable final de la ejecución de un Evento.</li>
                            <li><strong>Evento:</strong> Se refiere a la carrera de running, competencia atlética o actividad deportiva relacionada, cuya información es exhibida en la Plataforma y es organizada en su totalidad por un Organizador.</li>
                            <li><strong>Servicios:</strong> Las funciones que ofrece la Plataforma, consistentes en: (i) la exhibición de información sobre Eventos publicados por los Organizadores; (ii) la facilitación de un sistema de registro e inscripción en línea para los Usuarios; y (iii) el procesamiento de pagos de las inscripciones a través de una pasarela de pagos externa.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Objeto y Naturaleza del Servicio</h2>
                        <p className="text-gray-700 mb-4">
                            El objeto de la Plataforma es actuar como un mero intermediario tecnológico. Runity es un marketplace que conecta a Usuarios (corredores) con Organizadores de Eventos de running en Colombia.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Se deja expresa constancia de que Runity NO organiza, NO produce, NO financia, NO ejecuta ni tiene control alguno sobre la logística, seguridad o calidad de los Eventos listados en la Plataforma. Nuestro servicio se limita estricta y exclusivamente a la facilitación tecnológica para el descubrimiento, inscripción y pago de los Eventos.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Aceptación de los Términos</h2>
                        <p className="text-gray-700 mb-4">
                            El simple uso de la Plataforma, incluyendo la navegación sin registro, la creación de una cuenta de Usuario o la inscripción a cualquier Evento, constituye una manifestación de voluntad inequívoca y una aceptación total de los presentes TyC. Si usted no está de acuerdo con estos términos, debe abstenerse de utilizar la Plataforma.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Registro y Cuentas de Usuario</h2>
                        <p className="text-gray-700 mb-4">
                            Para inscribirse en un Evento, el Usuario deberá crear una cuenta proporcionando información veraz, exacta y actualizada. El Usuario debe ser mayor de edad según la legislación colombiana (18 años). La participación de menores de edad se rige por la cláusula 9.
                        </p>
                        <p className="text-gray-700 mb-4">
                            El Usuario es el único responsable de mantener la confidencialidad de su contraseña y de todas las actividades que ocurran en su cuenta. Deberá notificar a Runity de inmediato sobre cualquier uso no autorizado de la misma.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Proceso de Inscripción y Pago</h2>
                        <p className="text-gray-700 mb-4">
                            El Usuario seleccionará el Evento de su interés y completará el formulario de inscripción con sus datos personales. El pago de la inscripción se realizará a través de la pasarela de pago de terceros Epayco. Runity no almacena, procesa ni tiene acceso a la información financiera sensible del Usuario, como números de tarjetas de crédito.
                        </p>
                        <p className="text-gray-700 mb-4">
                            La inscripción a un Evento se considerará confirmada y efectiva únicamente después de que la pasarela de pagos confirme la transacción como "aprobada" y el Usuario reciba una confirmación por parte de la Plataforma.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Responsabilidad Exclusiva del Organizador</h2>
                        <p className="text-gray-700 mb-4">
                            El Usuario reconoce y acepta que el Organizador del Evento es el único y exclusivo responsable de todos los aspectos relacionados con el mismo, incluyendo pero no limitándose a:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>La veracidad, exactitud y completitud de la información del Evento publicada en la Plataforma (fecha, lugar, distancias, costos, reglamento).</li>
                            <li>La organización, producción y ejecución logística integral del Evento.</li>
                            <li>La seguridad, señalización, puntos de hidratación y asistencia médica durante el Evento.</li>
                            <li>La entrega de los kits de competencia, medallas, camisetas y cualquier otro material o beneficio prometido al Usuario.</li>
                            <li>La contratación y gestión de todas las pólizas de seguro requeridas por ley (incluyendo pólizas de accidentes para los participantes).</li>
                            <li>El cumplimiento de toda la normativa local, distrital y nacional aplicable para la realización de eventos públicos y deportivos.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Exclusión y Limitación de Responsabilidad de la Plataforma</h2>
                        <p className="text-gray-700 mb-4">
                            Al aceptar estos TyC, el Usuario comprende y acepta que la responsabilidad de Runity es limitada. En consecuencia, Runity se exime de toda responsabilidad, y no será responsable por ningún tipo de daño, perjuicio o reclamación derivada de:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Accidentes, lesiones, incapacidades o fallecimiento del Usuario ocurridos antes, durante o después de su participación en el Evento.</li>
                            <li>La cancelación, aplazamiento, cambio de fecha, lugar o modificación de las condiciones del Evento por decisión del Organizador, por motivos de fuerza mayor, caso fortuito o cualquier otra causa.</li>
                            <li>La pérdida, robo o daño de objetos personales del Usuario durante el Evento.</li>
                            <li>Cualquier disputa, incumplimiento o controversia que surja directamente entre el Usuario y el Organizador.</li>
                            <li>La calidad, organización o cualquier aspecto logístico del Evento.</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            El Usuario declara que participa en el Evento de forma voluntaria, bajo su propio riesgo y responsabilidad, y manifiesta encontrarse en las condiciones físicas y de salud óptimas y adecuadas para la exigencia física de la carrera.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Política de Cancelaciones, Devoluciones y Reembolsos</h2>
                        <p className="text-gray-700 mb-4">
                            La política de cancelación, devolución de dinero o transferencia de cupos es definida y ejecutada exclusivamente por el Organizador de cada Evento. Dicha política estará, en la medida de lo posible, descrita en la página de detalles del Evento dentro de la Plataforma.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Runity no gestiona, autoriza ni procesa reembolsos. Cualquier solicitud de cancelación o reembolso deberá ser dirigida por el Usuario directamente al Organizador.
                        </p>
                        <p className="text-gray-700 mb-4">
                            La comisión por el servicio cobrada por Runity, incluida en el valor total de la inscripción, no es reembolsable en ningún caso, incluso si el Evento es cancelado o el Usuario obtiene un reembolso por parte del Organizador.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Participación de Menores de Edad</h2>
                        <p className="text-gray-700 mb-4">
                            Para la inscripción de personas menores de 18 años, es requisito indispensable que el registro sea realizado por su padre, madre o tutor legal. Al inscribir a un menor de edad, el adulto responsable declara expresamente tener la patria potestad o la autorización legal correspondiente, y otorga su consentimiento informado para la participación del menor en el Evento.
                        </p>
                        <p className="text-gray-700 mb-4">
                            El adulto que realiza la inscripción asume toda la responsabilidad por la participación del menor, incluyendo su bienestar, seguridad y el cumplimiento de las condiciones de salud necesarias.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Tratamiento de Datos Personales (Habeas Data)</h2>
                        <p className="text-gray-700 mb-4">
                            Runity se compromete a cumplir con la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normativa aplicable sobre protección de datos personales en Colombia.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Al inscribirse en un Evento, el Usuario acepta y autoriza expresamente que sus datos personales (tales como nombre, documento de identidad, fecha de nacimiento, email, teléfono) sean compartidos con el Organizador del Evento específico en el que se inscribe. Esta transferencia de datos tiene como única finalidad permitir la correcta gestión logística del Evento (identificación, cronometraje, contacto de emergencia, resultados, etc.).
                        </p>
                        <p className="text-gray-700 mb-4">
                            Para más detalles sobre cómo tratamos sus datos, por favor consulte nuestra <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Política de Privacidad</a>, que es un documento complementario a estos TyC.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Servicios Gratuitos y Publicidad en la Plataforma</h2>
                        <p className="text-gray-700 mb-4">
                            Runity ofrece gran parte de sus Servicios de intermediación y comunidad sin costo para el Usuario. Para hacer esto posible, la Plataforma muestra publicidad y contenido patrocinado que puede ser de su interés.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Al aceptar estos Términos y Condiciones, usted reconoce y acepta que:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>La Plataforma puede mostrarle anuncios de terceros (en adelante, "Anunciantes"), como marcas deportivas, empresas de nutrición, servicios de salud u otros Organizadores de eventos.</li>
                            <li>Utilizamos la información que tenemos sobre usted (como sus intereses, las carreras en las que se ha inscrito o su ubicación) para mostrarle publicidad más relevante y útil. Este proceso se realiza de forma automatizada y está diseñado para proteger su privacidad.</li>
                            <li>Runity no vende ni compartirá su información de identificación personal (como su nombre, cédula o correo electrónico) con los Anunciantes a menos que usted nos dé un permiso explícito y separado para hacerlo.</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Para obtener información detallada sobre cómo recopilamos, usamos y protegemos sus datos para fines publicitarios, consulte nuestra <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Política de Privacidad</a>.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Propiedad Intelectual</h2>
                        <p className="text-gray-700 mb-4">
                            Todo el contenido, software, diseño, marcas, logos y demás elementos que componen la Plataforma son propiedad exclusiva de Runity S.A.S. o sus licenciantes.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Las marcas, logos, imágenes y nombres de los Eventos son propiedad de sus respectivos Organizadores y se utilizan en la Plataforma con fines meramente identificativos y promocionales.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Ley Aplicable y Jurisdicción</h2>
                        <p className="text-gray-700 mb-4">
                            Estos Términos y Condiciones se interpretarán y regirán en su totalidad por las leyes de la República de Colombia. Cualquier controversia, disputa o reclamación que surja de la relación entre el Usuario y Runity será resuelta por los jueces y tribunales competentes de la ciudad de Bogotá D.C., Colombia, renunciando el Usuario a cualquier otro fuero que pudiera corresponderle.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Disposiciones Finales</h2>
                        <p className="text-gray-700 mb-4">
                            Runity se reserva el derecho de modificar, enmendar o actualizar estos TyC en cualquier momento. Cualquier modificación será notificada a los Usuarios a través de la Plataforma o por correo electrónico y entrará en vigor desde su publicación.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Para cualquier duda o consulta sobre estos TyC o sobre los Servicios de la Plataforma, puede contactarnos a través del correo electrónico: <a href="mailto:contacto@runity.com" className="text-blue-600 hover:underline">contacto@runity.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </ResponsiveContainer>
    );
};

export default TermsAndConditions; 