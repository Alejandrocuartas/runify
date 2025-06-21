import React, { FC } from 'react';
import { ResponsiveContainer } from '../components/Layout';

const PrivacyPolicy: FC = () => {
    return (
        <ResponsiveContainer className="py-8 md:py-12">
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Política de Privacidad de Runity
                </h1>
                
                <div className="prose prose-lg max-w-none">
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                            <strong>Fecha de última actualización:</strong> 24 de mayo de 2024
                        </p>
                    </div>

                    <section className="mb-8">
                        <p className="text-gray-700 mb-6">
                            Su privacidad es una prioridad para Runity. La presente Política de Privacidad describe cómo [Nombre Legal de la Empresa S.A.S.] (en adelante, "Runity", "nosotros", "nuestro"), como responsable del tratamiento, recopila, usa, almacena y comparte su información personal a través de la plataforma web y/o aplicación móvil Runity (en adelante, la "Plataforma").
                        </p>
                        <p className="text-gray-700 mb-6">
                            Esta política se desarrolla en estricto cumplimiento de la Ley Estatutaria 1581 de 2012, el Decreto 1377 de 2013 y demás normas que las modifiquen, adicionen o complementen. Le recomendamos leer este documento en su totalidad para comprender sus derechos y nuestras prácticas.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Responsable del Tratamiento de Datos</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li><strong>Razón Social:</strong> [Nombre Legal de la Empresa S.A.S.]</li>
                            <li><strong>NIT:</strong> [NIT de la empresa]</li>
                            <li><strong>Dirección:</strong> [Dirección física de la empresa], [Ciudad], Colombia.</li>
                            <li><strong>Correo electrónico para Peticiones, Quejas y Reclamos (Derechos ARCO):</strong> <a href="mailto:privacidad@runity.com" className="text-blue-600 hover:underline">privacidad@runity.com</a></li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. ¿Qué Datos Personales Recopilamos?</h2>
                        <p className="text-gray-700 mb-4">
                            Recopilamos la información que usted nos proporciona directamente, la que se genera por su actividad en la Plataforma y la que obtenemos de terceros para prestar y mejorar nuestros servicios:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li><strong>Datos de Identificación y Registro:</strong> Nombre completo, número y tipo de documento de identidad, fecha de nacimiento, género.</li>
                            <li><strong>Datos de Contacto:</strong> Dirección de correo electrónico, número de teléfono, ciudad de residencia.</li>
                            <li><strong>Datos Relacionados con el Evento:</strong> Talla de camiseta, nombre del equipo de running al que pertenece (opcional).</li>
                            <li><strong>Datos de Menores de Edad:</strong> En el caso de la inscripción de menores de 18 años, recopilamos los datos de identificación del menor exclusivamente a través de su padre, madre o tutor legal, quien actúa como su representante y otorga la autorización explícita para el tratamiento de los datos del menor bajo las condiciones aquí descritas.</li>
                            <li><strong>Datos Sensibles:</strong> Para su seguridad en los Eventos, solicitamos el nombre y número de teléfono de un contacto de emergencia. Al proporcionar esta información, usted declara que cuenta con la autorización de dicho tercero para compartir sus datos con nosotros y con el Organizador del Evento. El único propósito de este dato es contactar a dicha persona en caso de una emergencia médica o de seguridad durante el Evento.</li>
                            <li><strong>Datos de Pago:</strong> La información de sus tarjetas de crédito/débito es gestionada directamente por nuestras pasarelas de pago aliadas, quienes cuentan con certificación PCI DSS. Runity no almacena, procesa ni tiene acceso a esta información sensible.</li>
                            <li><strong>Datos de Navegación y Uso:</strong> Podemos recopilar información técnica como su dirección IP, tipo de navegador y dispositivo, sistema operativo, y datos sobre su interacción con la Plataforma (carreras vistas, búsquedas realizadas) a través de cookies y tecnologías similares para mejorar su experiencia y para fines publicitarios.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Finalidades del Tratamiento de Datos</h2>
                        <p className="text-gray-700 mb-4">
                            Usamos sus datos personales para las siguientes finalidades:
                        </p>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Finalidades Principales (Necesarias para el Servicio):</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Crear, verificar y administrar su cuenta de usuario en la Plataforma.</li>
                            <li>Procesar su inscripción en los Eventos de su elección y gestionar el pago correspondiente.</li>
                            <li>Compartir sus datos de inscripción (identificación, contacto y contacto de emergencia) con el Organizador del Evento, para que este pueda gestionar la logística, seguridad, cronometraje, entrega de kits y cualquier aspecto relacionado con la organización del Evento.</li>
                            <li>Enviar comunicaciones transaccionales indispensables sobre sus inscripciones (confirmaciones de compra, recordatorios, información logística, notificaciones de cancelación o cambios en el Evento).</li>
                            <li>Atender sus solicitudes, quejas, reclamos y consultas a través de nuestros canales de servicio al cliente.</li>
                            <li>Garantizar la seguridad de la Plataforma, prevenir fraudes y cumplir con obligaciones legales y requerimientos de autoridades competentes.</li>
                        </ul>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Finalidades Comerciales, Publicitarias y de Marketing:</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li><strong>Personalizar y mostrar contenido publicitario:</strong> Utilizar los datos del Usuario para seleccionar y mostrar anuncios de nuestros Anunciantes que consideremos relevantes para usted dentro de la Plataforma.</li>
                            <li><strong>Generar audiencias segmentadas:</strong> Agrupar a los Usuarios en audiencias basadas en características e intereses comunes (ej. "corredores de maratón en Bogotá") para dirigir campañas publicitarias específicas, sin identificar individualmente a los miembros de dicha audiencia ante el Anunciante.</li>
                            <li><strong>Medir y analizar el rendimiento publicitario:</strong> Proporcionar a los Anunciantes informes agregados y anónimos sobre el rendimiento de sus campañas (ej. número de impresiones, clics), sin revelar la identidad de los Usuarios que interactuaron con el anuncio.</li>
                            <li><strong>Marketing por correo electrónico (con consentimiento opcional):</strong> Enviarle nuestro boletín informativo (newsletter), noticias, consejos de entrenamiento, e informarle sobre nuevos Eventos, promociones y descuentos disponibles en Runity. Esta finalidad requiere su aceptación explícita y podrá revocarla en cualquier momento.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. ¿Con Quién Compartimos sus Datos?</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li><strong>Organizadores de Eventos:</strong> Como se ha mencionado, es indispensable compartir sus datos de inscripción con el Organizador del Evento al que se inscribe. El Organizador se convierte en responsable del tratamiento de dichos datos para los fines del Evento.</li>
                            <li><strong>Proveedores de Servicios (Encargados del Tratamiento):</strong> Nos apoyamos en terceros para operar, como proveedores de hosting en la nube (ej. AWS), pasarelas de pago, herramientas de análisis de datos (ej. Google Analytics) y plataformas de email marketing. Estos proveedores solo tienen acceso a los datos necesarios y están obligados por contrato a proteger su información y usarla únicamente para los fines encomendados.</li>
                            <li><strong>Autoridades Públicas:</strong> Podremos compartir su información si es requerido por una autoridad judicial o administrativa competente en el ejercicio de sus funciones.</li>
                            <li><strong>Anunciantes:</strong> Nunca compartimos su identidad personal (nombre, documento, email, teléfono) con los Anunciantes, a menos que usted otorgue un consentimiento explícito y separado para una promoción específica.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Uso de Datos para Publicidad en Runity: Transparencia y Control</h2>
                        <p className="text-gray-700 mb-4">
                            Nuestro objetivo es mostrarle publicidad útil para su vida como corredor. Para lograrlo, seguimos estos principios:
                        </p>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Cómo Funciona Nuestro Sistema de Publicidad?</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Un Anunciante (ej. una marca de nutrición deportiva) nos indica el tipo de audiencia a la que desea llegar (ej. "corredores que se han inscrito a carreras de más de 21 km en el último año").</li>
                            <li>El sistema de Runity identifica a los Usuarios que cumplen con esos criterios de forma automatizada.</li>
                            <li>Mostramos el anuncio a esa audiencia directamente en nuestra Plataforma.</li>
                            <li>El Anunciante nunca sabe quiénes son las personas específicas que vieron su anuncio. Solo recibe informes de rendimiento anónimos, como "Tu anuncio fue visto por 1,800 personas que cumplen tus criterios".</li>
                        </ul>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">El Principio Clave: No Vendemos sus Datos Personales</h3>
                        <p className="text-gray-700 mb-4">
                            Reiteramos nuestro compromiso fundamental: Runity NO vende su información personal. No entregamos listas de nuestros usuarios a los Anunciantes. Actuamos como un puente seguro que conecta a los Anunciantes con audiencias relevantes, sin exponer la identidad de nuestros corredores.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Derechos del Titular (Derechos ARCO)</h2>
                        <p className="text-gray-700 mb-4">
                            Usted, como titular de los datos, tiene derecho a:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Acceder a los datos personales que tenemos sobre usted.</li>
                            <li>Conocer, actualizar y rectificar su información cuando sea inexacta o incompleta.</li>
                            <li>Solicitar prueba de la autorización que nos ha otorgado.</li>
                            <li>Ser informado sobre el uso que se le ha dado a sus datos.</li>
                            <li>Presentar quejas por infracciones a la ley ante la Superintendencia de Industria y Comercio (SIC).</li>
                            <li>Revocar la autorización y/o solicitar la supresión de sus datos, siempre que no exista un deber legal o contractual que nos obligue a conservarlos.</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            Para ejercer estos derechos, puede enviar su solicitud al correo electrónico: <a href="mailto:privacidad@runity.com" className="text-blue-600 hover:underline">privacidad@runity.com</a>, identificándose debidamente e indicando claramente el derecho que desea ejercer. El tiempo de respuesta a su solicitud será el estipulado por la ley.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Seguridad y Almacenamiento de la Información</h2>
                        <p className="text-gray-700 mb-4">
                            Implementamos medidas de seguridad técnicas, humanas y administrativas razonables para proteger su información contra acceso no autorizado, alteración, divulgación o destrucción. Sus datos serán conservados durante el tiempo que sea necesario para cumplir con las finalidades descritas en esta política, para cumplir con obligaciones legales (contables, fiscales) o hasta que usted solicite su supresión y sea legalmente procedente.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Política de Cookies</h2>
                        <p className="text-gray-700 mb-4">
                            Nuestra Plataforma utiliza cookies para su funcionamiento esencial, para análisis y para fines publicitarios. Para obtener información detallada sobre los tipos de cookies que usamos y cómo puede gestionarlas, por favor consulte nuestra <a href="/cookies-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Política de Cookies</a>.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Cambios en la Política de Privacidad</h2>
                        <p className="text-gray-700 mb-4">
                            Runity se reserva el derecho de modificar esta política en cualquier momento para reflejar cambios en nuestros servicios o en la legislación. Le notificaremos cualquier cambio sustancial a través de la Plataforma o por correo electrónico antes de que entre en vigor.
                        </p>
                    </section>
                </div>
            </div>
        </ResponsiveContainer>
    );
};

export default PrivacyPolicy; 