exports.reservationConfirmationEmail = (reservation) => {
    return `
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
        <tr style="background-color: #f9fafb;">
            <th style="padding: 12px 6px; text-align: left; font-size: 12px; color: #6b7280; text-transform: uppercase;">
                Cliente
            </th>
            <th style="padding: 12px 6px; text-align: left; font-size: 12px; color: #6b7280; text-transform: uppercase;">
                Fecha / Hora
            </th>
            <th style="padding: 12px 6px; text-align: left; font-size: 12px; color: #6b7280; text-transform: uppercase;">
                Personas / Mesa
            </th>
            <th style="padding: 12px 6px; text-align: left; font-size: 12px; color: #6b7280; text-transform: uppercase;">
                Contacto
            </th>
            <th style="padding: 12px 6px; text-align: left; font-size: 12px; color: #6b7280; text-transform: uppercase;">
                Estado
            </th>
            <th style="padding: 12px 6px; text-align: left; font-size: 12px; color: #6b7280; text-transform: uppercase;">
                Creado
            </th>
        </tr>

        <tr>
            <td style="padding: 12px 6px;">
                ${reservation.customer_name}
            </td>
            <td style="padding: 12px 6px;">
                ${reservation.reservation_date} — ${reservation.reservation_time}
            </td>
            <td style="padding: 12px 6px;">
                ${reservation.party_size} personas<br>
                Mesa: ${reservation.table_number || '—'}
            </td>
            <td style="padding: 12px 6px;">
                Email: ${reservation.customer_email}<br>
                Tel: ${reservation.customer_phone || '—'}
            </td>
            <td style="padding: 12px 6px; color: green; font-weight: bold;">
                Confirmada
            </td>
            <td style="padding: 12px 6px;">
                ${new Date().toLocaleString()}
            </td>
        </tr>
    </table>
  `;
};
