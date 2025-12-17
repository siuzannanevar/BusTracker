// Autofill for regions
$.get('/api/regions', regions => {
    $('#regionInput').autocomplete({
        source: regions
    });
});

// Autofill stops by region
$('#regionInput').on('change', function () {
    const region = $(this).val();

    $.get('/api/stops', { region }, stops => {
        // Getting unique stop_name
        const stopNames = [...new Set(stops.map(s => s.stop_name))];

        $('#stopInput').autocomplete({
            source: stopNames,
            select: function(event, ui) {
                selectedStop = stops.find(s => s.stop_name === ui.item.value);
            }
        });

        // Resetting the selected stop when changing the region
        selectedStop = null;
        $('#stopInput').val('');
        $('#busList').empty();
        $('#busTimes').empty();
    });
});

// Search for buses by stop
$('#searchBuses').on('click', function () {
    if (!selectedStop) {
        alert('Please select a bus stop from the list');
        return;
    }

    const stop = selectedStop;

    $.get('/api/buses', { stopId: stop.stop_id }, buses => {
        $('#busList').empty();
        $('#busTimes').empty();

        if (buses.length === 0) {
            $('#busList').text('No buses found for this stop');
            return;
        }

        buses.forEach(bus => {
            const btn = $('<button>')
                .addClass('btn btn-outline-primary m-1')
                .text(bus);

            btn.on('click', () => loadBusTimes(stop.stop_id, bus));

            $('#busList').append(btn);
        });
    });
});

// Loading bus arrival time
function loadBusTimes(stopId, busName) {
    $.get('/api/bus-times', { stopId, busName }, times => {
        $('#busTimes').empty();

        if (!times || times.length === 0) {
            $('#busTimes').text('No upcoming arrivals');
            return;
        }

        const list = $('<ul>');

        times.forEach(t => {
            list.append(`
                <li>
                    <strong>${t.arrival_time}</strong>
                    — direction: ${t.headsign}
                </li>
            `);
        });

        $('#busTimes').append('<h5>Next arrivals</h5>');
        $('#busTimes').append(list);

        $('#busTimes').append(
            '<div class="text-muted mt-2">⚠ Arrival time may extend into the next day.</div>'
        );
    });
}


// Find the nearest stop by geolocation
$('#findNearest').on('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            $.ajax({
                url: '/api/nearest-stop',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ lat: latitude, lon: longitude }),
                success: stop => {
                    if (!stop) return alert('No stop found nearby');

                    $('#regionInput').val(stop.stop_area).trigger('change');

                    setTimeout(() => {
                        $('#stopInput').val(stop.stop_name);
                        selectedStop = stop;

                        $('#searchBuses').click();
                    }, 300); 
                },
                error: err => {
                    console.error(err);
                    alert('Failed to find the nearest stop');
                }
            });

        }, () => alert('Error. Cannot get your location'));
    } else {
        alert('Geolocation is not supported by your browser');
    }
});

// Clear selection
$('#clearSelection').on('click', () => {
    selectedStop = null;
    $('#regionInput').val('');
    $('#stopInput').val('');
    $('#busList').empty();
    $('#busTimes').empty();
});
